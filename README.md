# Dynamic Word Cloud Visualization

A React application that creates dynamic word clouds using D3.js to visualize word frequency from user-inputted text.

## Features

- **Dynamic Word Cloud**: Displays the top 5 most frequent words from input text
- **Smooth Animations**: Words smoothly transition in size and position when text is updated
- **Frequency-based Sizing**: Word size reflects frequency using D3's scaleLinear
- **Fade Animations**: Words that no longer exist fade out smoothly
- **Position Transitions**: Words move smoothly to new positions when text changes

## How to Use

1. Enter text in the textarea
2. Click "Generate WordCloud" button
3. Watch as the word cloud animates to show the most frequent words
4. Update the text to see smooth transitions as words change position and size

## Technology Stack

- React 18
- D3.js 7
- HTML5/CSS3

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Install gh-pages: `npm install --save-dev gh-pages`
4. Add deploy script to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
5. Add homepage field to package.json:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```
6. Run `npm run deploy` to deploy to GitHub Pages

## Example Texts

Try these example texts to see the animations:

**Text 1:**
"The streets were filled with people, people walking, people talking, people laughing, people in a hurry. Everyone seemed to be in a rush, moving quickly from one place to another. The city was alive with activity, with people everywhere you looked. The noise of the city was constant, with cars honking, people chatting, and footsteps echoing through the streets. It was a city full of people, a city where life never stopped."

**Text 2:**
"The streets stretched endlessly, weaving through the heart of the city, connecting neighborhoods in a seamless flow. In every corner of the city, there was something happening, whether it was the vibrant market stalls or the quiet parks hidden amidst the urban landscape. The city skyline towered above, a reminder of the ambition and drive that defined the city. As night fell, the lights of the city illuminated the streets, casting a glow that reminded everyone just how alive the city truly was."
