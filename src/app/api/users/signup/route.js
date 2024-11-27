import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../../../utils/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password, role, college } = reqBody;

        console.log(reqBody);

        // Check if the user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Validate college field if role is 'college'
        if (role === "college" && !college) {
            return NextResponse.json(
                { error: "College must be specified for college role" },
                { status: 400 }
            );
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user with the college field if applicable
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            ...(role === "college" && { college }), // Add college field conditionally
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
