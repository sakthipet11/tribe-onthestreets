# OTS Tribe Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications
- Vercel account for deployment
- GA4 property ID

## Environment Variables

Add these to your `.env.local` (local) and Vercel environment variables (production):

\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ots_tribe
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
CREW_EMAILS=crew1@onthestreets.in,crew2@onthestreets.in
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_key_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Add `.env.local` with environment variables
4. Run development server: `npm run dev`
5. Visit `http://localhost:3000`

## Deployment to Vercel

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Custom Domain

To deploy to `tribe.onthestreets.in`:

1. In Vercel dashboard → Project Settings → Domains
2. Add domain: `tribe.onthestreets.in`
3. Update DNS records at your domain registrar
4. Vercel will provide DNS instructions

## MongoDB Setup

1. Create MongoDB Atlas cluster
2. Add IP whitelist (or allow all)
3. Create database user
4. Copy connection string
5. Add to MONGODB_URI environment variable

## Email Notifications (Gmail)

1. Enable 2FA on Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password in EMAIL_PASSWORD variable

## Admin Dashboard

Access at `https://tribe.onthestreets.in/admin`
Login with ADMIN_PASSWORD

## Testing Checklist

- [ ] Form validation works
- [ ] Submissions appear in MongoDB
- [ ] Email notifications sent to crew
- [ ] Admin dashboard loads & filters work
- [ ] CSV export works
- [ ] GA4 events firing
- [ ] Mobile responsive
- [ ] Performance: LCP < 2.5s

## Performance Optimization

- Images are optimized with Next.js Image component
- CSS is minified with Tailwind
- JavaScript is code-split automatically
- Vercel provides CDN caching

## Support

For issues, check logs in Vercel dashboard or MongoDB Atlas for connection errors.
