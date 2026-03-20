# Sukriti Khosla Portfolio Website

A professional marketing consultant portfolio website with integrated contact form using MailChannels.

## 📧 Email Configuration

**Emails are sent to:** `hello@sukritikhosla.com`

Each form submission includes:
- Name (First & Last)
- Email address
- Phone number
- Company/Business (optional)
- Service interest selection
- Message content

## 📁 Project Structure

```
sukriti-portfolio/
├── index.html                    # Main website file
├── img/
│   └── portfolio_headshot.png   # Professional headshot image
├── functions/
│   └── api/
│       └── contact.js           # Cloudflare Pages Function for contact form
└── README.md                    # This file
```

## 🚀 Deployment to Cloudflare Pages

### Step 1: Upload to GitHub

1. Create a new GitHub repository
2. Upload all files maintaining the folder structure above
3. Commit and push to your repository

### Step 2: Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** > **Pages**
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your GitHub repository
6. Configure build settings:
   - **Project name:** sukriti-portfolio (or your choice)
   - **Production branch:** main
   - **Build command:** Leave empty (static site)
   - **Build output directory:** `/`
7. Click **Save and Deploy**

### Step 3: Email Configuration

The contact form uses **MailChannels** (free for Cloudflare Pages, no API key needed).

**Important:** Update email addresses in `functions/api/contact.js`:

```javascript
// Line 35 - Recipient email
email: 'hello@sukritikhosla.com',  // Change to your email

// Line 40 - Sender email (must match your domain)
email: 'noreply@sukritikhosla.com',  // Change to noreply@yourdomain.com
```

### Step 4: DNS Configuration (Recommended for Better Deliverability)

Add these DNS records in Cloudflare:

**SPF Record:**
```
Type: TXT
Name: @
Content: v=spf1 include:relay.mailchannels.net ~all
```

**DKIM Record (Optional but Recommended):**
```
Type: TXT
Name: mailchannels._domainkey
Content: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY
```

### Step 5: Custom Domain (Optional)

1. In your Cloudflare Pages project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `sukritikhosla.com`)
4. Cloudflare will automatically configure DNS

## 🧪 Testing the Contact Form

1. Visit your deployed Cloudflare Pages URL
2. Scroll to the Contact section
3. Fill out and submit the form
4. Check your inbox at `hello@sukritikhosla.com`
5. Check spam/junk folder if not received within a few minutes

## 🎨 Local Development

Simply open `index.html` in your web browser to preview the design. 

**Note:** The contact form will **not work locally** as it requires the Cloudflare Pages environment and MailChannels API.

## ⚡ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Service showcase cards
- ✅ Pricing tiers with "Get Started" buttons
- ✅ Professional about section with headshot
- ✅ Working contact form with email notifications
- ✅ SEO optimized

## 🔧 Troubleshooting

### Contact Form Not Working

1. **Check Cloudflare Pages Logs:**
   - Go to your project > **Functions** tab
   - View recent invocations and error logs

2. **Verify Email Configuration:**
   - Ensure `hello@sukritikhosla.com` exists and can receive emails
   - Check spam/junk folders
   - Verify sender email matches your domain

3. **DNS Records:**
   - Confirm SPF record is properly set up
   - MailChannels may reject emails without proper DNS

4. **Function Location:**
   - Verify `functions/api/contact.js` exists in correct path
   - Redeploy if necessary

### Common Issues

**"Failed to send email" error:**
- Check that `noreply@sukritikhosla.com` matches your actual domain
- Verify MailChannels API is accessible from Cloudflare

**Form shows success but no email received:**
- Check spam/junk folder
- Verify recipient email is correct
- Check Cloudflare Pages function logs

**Browser console errors:**
- Open DevTools (F12) > Console tab
- Look for network errors or CORS issues

## 📞 Support

For questions or assistance:
- **Email:** hello@sukritikhosla.com
- **LinkedIn:** [linkedin.com/in/sukritikhosla](https://linkedin.com/in/sukritikhosla)

## 📄 License

© 2026 Sukriti Khosla. All rights reserved.

---

**Need help with deployment?** Contact hello@sukritikhosla.com
