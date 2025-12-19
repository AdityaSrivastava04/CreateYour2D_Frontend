# CreateYour2D Frontend

> Turn your imagination into animations with just a few words

A chat-based web app that lets you create professional 2D animations by simply describing what you want. Powered by AI and Manim.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)

## What is this?

Ever wanted to create math animations or motion graphics but found the tools too complicated? This project makes it simple. Just chat with the app like you would with a friend, describe the animation you want, and watch it come to life.

Behind the scenes, it uses Claude AI to write Manim code (a Python animation library) and then renders it into a video you can download.

## What can it do?

- **Chat to create** - No coding needed, just describe what you want
- **Instant previews** - See your animation right in the chat window
- **Multiple projects** - Work on different animations in separate conversations
- **Smart retries** - If something goes wrong, it tries again automatically
- **Download anywhere** - Save your videos and use them however you like
- **Clean interface** - Dark mode design that's easy on the eyes
- **Works everywhere** - Responsive design for desktop and mobile

## Getting started

### What you'll need

- Node.js 16 or newer
- npm or yarn
- The backend server running (grab it from [here](https://github.com/AdityaSrivastava04/CreateYour2D_Backend))

### Setup

**1. Get the code**
```bash
git clone https://github.com/AdityaSrivastava04/CreateYour2D.git
cd CreateYour2D
```

**2. Install everything**
```bash
npm install
```

**3. Set up your environment**

Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080
```

**4. Fire it up**
```bash
npm start
```

**5. Start creating**

Open `http://localhost:3000` in your browser and you're good to go!

## How the code is organized

```
CreateYour2D_Frontend/
├── src/
│   ├── components/
│   │   ├── ChatArea.tsx       # Where you chat and see videos
│   │   ├── Sidebar.tsx        # Manage your conversations
│   │   └── ...
│   ├── App.tsx                # Main app component
│   └── index.tsx              # Where everything starts
├── package.json
└── tailwind.config.js
```

Pretty straightforward - the chat interface, sidebar for managing conversations, and all the styling in one place.

## How to use it

### Making your first animation

1. Hit "New Chat" in the sidebar
2. Type something like: *"Create a blue square that moves from left to right"*
3. Wait a moment while it generates
4. Watch your animation play
5. Click download if you want to keep it

### Try these prompts

- "Make a red circle that grows bigger and then smaller"
- "Draw the graph of y = x²"
- "Show the text 'Hello World' appearing one letter at a time"
- "Create three dots and connect them with lines"

Feel free to experiment - the more specific you are, the better the results!

## Want to customize?

### Change the API server

Edit the URL in `ChatArea.tsx`:
```typescript
const response = await axios.post('YOUR_API_URL_HERE/api/generate-video-base64', {
  userPrompt: trimmed,
});
```

### Adjust the look

Modify colors and styles in `tailwind.config.js` to make it yours.

## How it talks to the backend

The app sends your text prompt to the backend, which generates the animation and sends back a video. Here's what that looks like:

**You send:**
```json
{
  "userPrompt": "Create a blue square that moves from left to right"
}
```

**You get back:**
```json
{
  "statusCode": 200,
  "video": {
    "video": "data:video/mp4;base64,...",
    "attempts": 1,
    "message": "Video generated successfully"
  },
  "success": true
}
```

## Built with

- React - For the UI
- TypeScript - Keeps the code clean and bug-free
- Tailwind CSS - Makes it look good
- Axios - Handles API calls

## Running into issues?

**Video won't load?**
- Make sure the backend is running
- Check that the API URL is correct
- Look for any errors in the browser console

**Generation keeps failing?**
- Try being more specific in your prompt
- Check the backend logs
- Make sure Manim is installed on the backend

**App feels slow?**
- Clear your browser cache
- Close some conversations
- Videos are generated on-demand, so the first one might take a moment

## Want to contribute?

I'd love your help! Here's how:

1. Fork this repo
2. Create a branch (`git checkout -b cool-new-feature`)
3. Make your changes
4. Commit them (`git commit -m 'Added something cool'`)
5. Push to your branch (`git push origin cool-new-feature`)
6. Open a Pull Request

Keep it clean, use TypeScript properly, and write commits that make sense.

## License

MIT License - use it however you want!

## Credits

Made by [Aditya Srivastava](https://github.com/AdityaSrivastava04)

Big thanks to:
- The Manim Community for the animation engine
- Anthropic for Claude AI
- Everyone in the React and TypeScript communities

## Need help?

Got questions or ran into a bug? Open an issue here on GitHub and I'll help you out.

## Links

- [Backend repo](https://github.com/AdityaSrivastava04/CreateYour2D/tree/main/server)
- Live demo coming soon!

## What's next?

Some ideas I'm thinking about:
- Pre-made animation templates
- User accounts so you can save your work
- Ability to edit animations after generating
- Different animation styles
- Export to GIF or other formats
- Store animations in the cloud
- Work on animations with friends
- Mobile app

If you want to help with any of these, let me know!

---

Built with curiosity and caffeine ☕