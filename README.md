# Stremo-Video-Streaming-Website
This project is a video streaming website with a user interface similar to Netflix, built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to sign up, log in, and watch videos stored locally on the server. Additionally, it integrates with the TMDB (The Movie Database) API to display a variety of movies. The website includes features such as video playback control, continue watching functionality, and a dynamic movie slider.

## Features

- **User Authentication:**
  - Sign up and sign in forms are required for user access.
  - User authentication is managed using a database.

- **Video Playback:**
  - Play, pause, and continue watching videos.
  - Videos are stored in a local folder on the server.

- **TMDB API Integration:**
  - Display movies retrieved from the TMDB API.
  - Some movies are available for local playback.

- **UI Components:**
  - **Navbar:**
    - Home link
    - Movies link
    - Search form
    - Account dropdown with options for account settings, help center, and sign out.
  - **Footer:**
    - Static footer with relevant links and information.
  - **Movie Slider:**
    - Category-wise slider showcasing movie images.
    - Clicking on a movie image opens a modal with detailed content about the movie.
  - **Banner:**
    - Static banner below the navbar with some content displayed on it.

## Usage
```bash
git clone https://github.com/VirtiShah247/Stremo-Video-Streaming-Website
cd frontend
npm install
cd backend
npm install
cd ../
npm run dev
