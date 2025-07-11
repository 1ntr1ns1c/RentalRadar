# Cloudinary Setup Guide

## Overview
This guide will help you set up Cloudinary for image uploads in the RentalRadar application.

## Step 1: Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Cloudinary Credentials
1. Log in to your Cloudinary dashboard
2. Note down your **Cloud Name** from the dashboard
3. Go to Settings → Upload
4. Create a new upload preset:
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Save the preset name

## Step 3: Configure the Application
1. Open `frontend/src/lib/cloudinary.ts`
2. Replace the placeholder values:
   ```typescript
   const CLOUDINARY_CLOUD_NAME = 'your-cloud-name'; // Your cloud name
   const CLOUDINARY_UPLOAD_PRESET = 'your-upload-preset'; // Your upload preset
   ```

## Step 4: Test the Integration
1. Start your application
2. Go to the Dashboard (as a landlord)
3. Try adding a new property with an image
4. The image should upload to Cloudinary and display in the form

## Features
- **Image Upload**: Drag and drop or click to upload images
- **File Validation**: Only image files accepted (max 5MB)
- **Automatic Resizing**: Images are optimized for web display
- **Secure URLs**: All images use HTTPS

## Troubleshooting
- **Upload Failed**: Check your cloud name and upload preset
- **CORS Errors**: Ensure your upload preset allows unsigned uploads
- **Large Files**: Images are limited to 5MB for performance

## Security Notes
- The upload preset should be set to "unsigned" for client-side uploads
- Consider adding additional validation on the server side
- Monitor your Cloudinary usage to stay within free tier limits 