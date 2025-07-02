#!/bin/bash

# Build the project
npm run build

# Add .nojekyll to the output
touch out/.nojekyll

# Create a CNAME file if you have a custom domain (optional)
# echo "yourdomain.com" > out/CNAME

# Deploy to gh-pages
npx gh-pages -d out --dotfiles