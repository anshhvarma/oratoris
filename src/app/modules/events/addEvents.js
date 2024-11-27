'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/app/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";



export default function EventsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({
        title: '',
        description: '',
        speaker: {
            name: '',
            email: '',
        },
        // date: '',
        duration: 1,
        eventType: '',
        tags: [],
        isOnline: false,
        createdBy: null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [events, setEvents] = useState([]);

       // Fetch events
       const fetchEvents = async () => {
        try {
            const response = await fetch('/api/users/events');
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch events', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!currentEvent.title || !currentEvent.eventType) {
            alert('Please fill in all required fields');
            return;
        }

        // Prepare the event data for submission
        const eventData = {
            ...currentEvent,
            // Remove createdBy if it's empty or null
            ...(currentEvent.createdBy ? { createdBy: currentEvent.createdBy } : {}),
            date: currentEvent.date ? new Date(currentEvent.date).toISOString() : null
        };

        try {
            const url = isEditing
                ? `/api/users/events?id=${currentEvent._id}`
                : '/api/users/events';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            const data = await response.json();
            
            console.log('Server Response:', data);

            if (data.success) {
                fetchEvents();
                resetForm();
                setIsDialogOpen(false);
            } else {
                alert(data.error || 'Failed to submit event');
            }
        } catch (error) {
            console.error('Failed to submit event', error);
            alert('An error occurred while submitting the event');
        }
    }
    // Reset form to initial state
    const resetForm = () => {
        setCurrentEvent({
            title: '',
            description: '',
            speaker: {
                name: '',
                email: '',
            },
            date: '',
            duration: 1,
            eventType: '',
            tags: [],
            isOnline: false,
            registrationLink: '',
            createdBy: null
        });
        setIsEditing(false);
    };

    // Open dialog for editing
    const openEditDialog = (event) => {
        setCurrentEvent({
            ...event,
            // Ensure date is properly formatted for datetime-local input
            date: event.date
                ? new Date(event.date).toISOString().slice(0, 16)
                : ''
        });
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    // Open dialog for adding new event
    const openAddDialog = () => {
        resetForm();
        setIsDialogOpen(true);
    };

    // Handle tag input
    const handleTagInput = (tagString) => {
        const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag);
        setCurrentEvent(prev => ({
            ...prev,
            tags
        }));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto p-4">
                    <Button onClick={openAddDialog} className="mb-4">Add New Event</Button>

                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) resetForm();
                        }}
                    >
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {isEditing ? 'Edit Event' : 'Add New Event'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Basic Event Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Title</Label>
                                        <Input
                                            value={currentEvent.title}
                                            onChange={(e) =>
                                                setCurrentEvent(prev => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Event Type</Label>
                                        <Select
                                            value={currentEvent.eventType}
                                            onValueChange={(value) =>
                                                setCurrentEvent(prev => ({
                                                    ...prev,
                                                    eventType: value
                                                }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Event Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Seminar">Seminar</SelectItem>
                                                <SelectItem value="Conference">Conference</SelectItem>
                                                <SelectItem value="Workshop">Workshop</SelectItem>
                                                <SelectItem value="Webinar">Webinar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label>Description</Label>
                                    <Input
                                        value={currentEvent.description}
                                        onChange={(e) =>
                                            setCurrentEvent(prev => ({
                                                ...prev,
                                                description: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                {/* Date and Duration */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* <div>
                                        <Label>Date and Time</Label>
                                        <Input
                                            type="datetime-local"
                                            value={currentEvent.date}
                                            onChange={(e) =>
                                                setCurrentEvent(prev => ({
                                                    ...prev,
                                                    date: e.target.value
                                                }))
                                            }
                                            required
                                        />
                                    </div> */}
                                    <div>
                                        <Label>Duration (hours)</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={currentEvent.duration}
                                            onChange={(e) =>
                                                setCurrentEvent(prev => ({
                                                    ...prev,
                                                    duration: parseInt(e.target.value)
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Speaker Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Speaker Name</Label>
                                        <Input
                                            value={currentEvent.speaker.name}
                                            onChange={(e) =>
                                                setCurrentEvent(prev => ({
                                                    ...prev,
                                                    speaker: {
                                                        ...prev.speaker,
                                                        name: e.target.value
                                                    }
                                                }))
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>Speaker Email</Label>
                                        <Input
                                            type="email"
                                            value={currentEvent.speaker.email || ""}
                                            onChange={(e) =>
                                                setCurrentEvent((prev) => ({
                                                    ...prev,
                                                    speaker: {
                                                        ...prev.speaker,
                                                        email: e.target.value,
                                                    },
                                                }))
                                            }
                                        />

                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Tags (comma-separated)</Label>
                                        <Input
                                            value={currentEvent.tags.join(', ')}
                                            onChange={(e) => handleTagInput(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Online Event Checkbox */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={currentEvent.isOnline}
                                        onCheckedChange={(checked) =>
                                            setCurrentEvent(prev => ({
                                                ...prev,
                                                isOnline: checked
                                            }))
                                        }
                                    />
                                    <Label>Is this an online event?</Label>
                                </div>

                                <Button type="submit">
                                    {isEditing ? 'Update Event' : 'Add Event'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

        </div>
    );
}