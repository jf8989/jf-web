# Next.js Template

## What You DON'T Need To Do! 🎉
This template saves you time by having everything pre-configured:
- ✅ No need to run `create-next-app`
- ✅ No need to install and configure Tailwind CSS
- ✅ No need to set up TypeScript
- ✅ No need to configure ESLint or Prettier
- ✅ No need to set up folder structure
- ✅ No need to configure font optimization

Just clone and start coding!

## Step-by-Step Setup Instructions

### 1. Create Your Project Folder
First, let's set up your workspace:

1. Create a new folder on your computer where you want your project to live
   ```bash
   # In Windows File Explorer:
   - Right-click > New > Folder
   - Name it your project name (example: "my-next-website")

   # OR in PowerShell:
   New-Item -ItemType Directory -Path "my-next-website"
   Set-Location my-next-website
   
   # OR in Command Prompt:
   mkdir my-next-website
   cd my-next-website
   ```

2. Open VS Code
   - Open VS Code
   - Go to File > Open Folder
   - Select the folder you just created

3. Open the VS Code terminal
   - Press `` Ctrl + ` `` (backtick key) or
   - Go to View > Terminal
   - Make sure PowerShell is selected as your terminal (click the dropdown in the terminal if needed)

### 2. Clone the Template
In the VS Code terminal (PowerShell):
```powershell
git clone https://github.com/jf8989/next-js-template-jf8989.git .
```
(Don't forget the dot at the end - it means "clone into current folder")

### 3. Set Up Fresh Git Repository
In the same terminal:
```powershell
# Remove the template's git history
Remove-Item -Recurse -Force .git

# Start fresh git repository
git init

# Check your default branch name (it might be 'master' or 'main')
git branch --show-current

# If you need to rename your branch from 'master' to 'main' (optional)
# git branch -m master main

# First, check if you have any remotes configured
git remote -v

# Add your own repository (replace with your actual GitHub repository URL)
# Note: Make sure you first create the repository on GitHub!
git remote add origin https://github.com/username/repo-name.git

# Verify your remote was added correctly
git remote -v

# Stage and commit your initial files
git add .
git commit -m "ready to work on client brief"

# Push to your repository (use whatever branch name you have: main or master)
git push -u origin master  # or 'main' if that's your branch name
```

### 4. Install Dependencies
Still in the terminal:
```powershell
# Install all needed packages
npm install

# If you need to update your Next.js version
npm install next@latest

# Then check the version installed
npx next --version

# Then install Vercel globally for deployment
npm install -g vercel

# To login into Vercel
vercel login
vercel
```

### 5. Start Development Server
```powershell
# Start your project
npm run dev
```

### 6. View Your Website
- Open your browser
- Go to http://localhost:3000
- You should see your new website!

### 7. Start Developing
- Create a new branch for your brief
```powershell
# Create and switch to new branch
git checkout -b brief

# Stage and commit your initial files
git add .
git commit -m "ready to work on client brief"

# Return to main branch
git checkout main
```
- Open `app/page.tsx` in VS Code to edit the home page
- Set "isTesting" TRUE to use the Dummy project data or FALSE to use the Main one
- Save changes and they'll update automatically in your browser showing the correct project data information

### 8. Deploy Brief Branch to Vercel
- Deploy using CLI directly within your project's terminal:
```powershell
# 1. Run the deploy command
vercel --prod
# 2. When prompted:
   - "Set up and deploy" → press Enter
   - "Which scope do you want to deploy to?" → choose your account (press Enter)
   - "Link to existing project? (y/N)" → type N
   - "What’s your project’s name?" → type your project name (e.g., j-notes)
   - "In which directory is your code located?" → press Enter (defaults to current folder)
   - Vercel will auto-detect it’s a Next.js project
   - "Want to override settings?" → type N
   - "Install Command, Build Command, Output Directory" → press Enter for all (defaults)
# 3. Wait for deployment to complete. You'll see:
   ✔ Build completed
   ✔ Project deployed to https://brief-yourproject.vercel.app
```
- OR:
1. Go to [Vercel](https://vercel.com)
2. Open your project dashboard
3. Click "Git" in the main navigation
4. Under "Branches," find your "brief" branch
5. Click "Deploy" next to the branch name
6. Wait for deployment to complete
7. Access your deployed brief branch using the provided URL

The deployment URL will typically be: `brief-[your-project-name].vercel.app`

## Common Issues & Solutions

- If `git clone` doesn't work: Make sure you have Git installed
  - Download from: https://git-scm.com/downloads

- If `npm` commands don't work: Install Node.js
  - Download from: https://nodejs.org
  - Choose the "LTS" (Long Term Support) version

- If PowerShell says "running scripts is disabled":
  1. Open PowerShell as Administrator
  2. Run: `Set-ExecutionPolicy RemoteSigned`
  3. Type 'Y' to accept

## Project Structure

```
your-project-folder/
├── app/                # Your pages live here
│   └── page.tsx       # Your home page
├── components/         # Reusable parts
├── public/            # Images and other files
└── styles/            # CSS files
```

## Features Included

- Next.js 14+ (modern React framework)
- Tailwind CSS (for styling)
- TypeScript support
- ESLint and Prettier (code formatting)
- Responsive layout
- Dark mode support

## Development Tips

### Creating New Pages
To add a new page (example: About page):
1. Create a new folder in `app`
2. Name it what you want the URL to be
3. Add a `page.tsx` file inside it

Example:
```
app/
└── about/
    └── page.tsx    # Creates /about page
```

### Adding Styles
Use Tailwind CSS classes directly in your code:
```jsx
<div className="text-blue-500 p-4">
  This text will be blue with padding
</div>
```

## Deployment

When ready to publish:

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Click Deploy

## Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT License - Free to use for any purpose
