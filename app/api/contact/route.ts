import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const data: ContactFormData = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
        // For now, just log the inquiry
        console.log('New inquiry received:', {
            name: data.name,
            email: data.email,
            phone: data.phone || 'N/A',
            itemReference: data.itemReference || 'N/A',
            message: data.message,
            timestamp: new Date().toISOString(),
        });

        // In production, you would send an email here
        // Example with SendGrid:
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        //   to: 'info@annalisamartino.com',
        //   from: 'website@annalisamartino.com',
        //   subject: `New Inquiry: ${data.itemReference}`,
        //   text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`,
        //   html: `<p><strong>Name:</strong> ${data.name}</p>...`,
        // };
        // await sgMail.send(msg);

        return NextResponse.json(
            {
                success: true,
                message: 'Inquiry sent successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
