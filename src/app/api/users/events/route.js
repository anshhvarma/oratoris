// /app/api/users/events/route.js

import { connect } from "@/dbConfig/dbconfig";
import Event from '@/models/EventModel';

// Connect to the database
connect();

// GET method handler
export async function GET(req) {
  try {
    const events = await Event.find({});
    return new Response(JSON.stringify({ success: true, data: events }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST method handler
export async function POST(req) {
  try {
    const body = await req.json();
    const event = await Event.create(body);
    return new Response(JSON.stringify({ success: true, data: event }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT method handler
export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();
    const event = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ success: true, data: event }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}

// DELETE method handler
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return new Response(JSON.stringify({ success: false, message: 'Event not found' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ success: true, message: 'Event deleted' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }
}
