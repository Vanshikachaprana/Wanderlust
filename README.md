# Wanderlust

A full-stack Airbnb-style vacation rental website built with Node.js, Express, MongoDB and EJS. Users can browse stays, create listings with photos and locations, leave reviews, and generate listing descriptions with AI.

## Features

- User signup, login and logout (Passport.js)
- Create, view, edit and delete listings
- Image uploads (Multer + Cloudinary)
- Location maps (Mapbox)
- Reviews on listings
- Listing categories (Mountains, Beaches, Camping, and more)
- Server-side validation (Joi) and flash messages
- **AI description generator:** click "Generate Description" while creating a listing and the app drafts a description from the title, location, country and category. The text appears in the description box so you can edit it before saving.

## About the AI feature

- The Gemini API is called only from the backend, so the API key is never exposed to the browser
- The prompt tells the AI not to invent facts that the user did not provide
- The route requires login and is rate limited
- Input is validated and cleaned on the server
- If the AI fails, the user sees a friendly message and can still write the description manually

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, EJS-Mate, Bootstrap, HTML, CSS, JavaScript
- **Authentication:** Passport.js, express-session
- **Uploads:** Multer, Cloudinary
- **Maps:** Mapbox
- **AI:** Google Gemini API (`@google/genai`)
- **Other:** Joi, express-rate-limit





## Author

🔗 Live Demo: [(https://wanderlust-t14v.onrender.com)]
💻 GitHub: [https://github.com/Vanshikachaprana/Wanderlust]
