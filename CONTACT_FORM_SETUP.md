# Contact Form Setup Guide

Your contact form is now configured to use **Web3Forms** - a free service that sends form submissions directly to your email.

## Quick Setup (5 minutes)

### Step 1: Get Your Free Access Key

1. Go to **https://web3forms.com**
2. Enter your email address (mashudkhalid.work@gmail.com)
3. Click "Create Access Key"
4. Check your email and verify your address
5. Copy your access key (it looks like: `a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`)

### Step 2: Add Access Key to Your Form

1. Open `index.html`
2. Find the hidden `access_key` input:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
4. Save the file

### Step 3: Test It!

1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit it
4. Check your email - you should receive the message!

### Step 4: Activate hCaptcha

1. Open the form in your Web3Forms dashboard
2. Select hCaptcha as the CAPTCHA provider
3. Save the form settings

The page already includes Web3Forms' hCaptcha widget and client script.

### Security Note

Your `access_key` is already live in `index.html`. This is normal — Web3Forms access keys are designed to be used client-side, similar to a public site ID. However, if this repository is public on GitHub, anyone could technically copy your key and use it to send form submissions through your Web3Forms account. To prevent this:

1. Log in to your Web3Forms dashboard
2. Open your access key's settings
3. Add your live domain (`mashudkhalid.vercel.app`) to the allowed domains / referrer restriction list

This way the key only works when submitted from your actual site.

## Features

✅ **Real email delivery** - Messages go directly to your inbox  
✅ **Spam protection** - Server filtering, honeypot, and hCaptcha
✅ **No backend needed** - Works on any static hosting  
✅ **Free tier** - 250 submissions per month  
✅ **Success/Error messages** - User feedback is handled  
✅ **Mobile friendly** - Works on all devices

## Troubleshooting

**Form not sending?**

- Make sure you replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- Check browser console for errors (F12)
- Verify your access key is activated via email

**Not receiving emails?**

- Check your spam folder
- Verify the email address in your Web3Forms account
- Make sure you verified your email address

**Want to customize notifications?**

- Log in to web3forms.com dashboard
- Configure email templates, webhooks, and more

## Alternative Options

If you prefer other services, you can easily switch:

- **Formspree** (https://formspree.io) - Popular alternative
- **Netlify Forms** - Built-in if deploying to Netlify
- **EmailJS** (https://emailjs.com) - Client-side email sending
- **Getform** (https://getform.io) - Another form backend

Update the API endpoint in `js/contact.js`.

## Support

- Web3Forms Docs: https://docs.web3forms.com
- Your form is already set up - just add your access key!
