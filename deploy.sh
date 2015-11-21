#!/bin/bash
git config user.email "tparnell8@gmail.com"
git config user.name "Tommy Parnell"
rm -rf components
rm -rf node_modules
git add . --force
git commit -m "Deployed to Github Pages"
git push --force "git@github.com:tparnell8/about.tommyparnell.com.node.git" master:gh-pages
