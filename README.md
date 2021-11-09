# WellNews

## Abstract

A novel news application that seeks to help news consumers feel emotionally balanced after reading the news. This application was built utilizing TypeScript, React, React Hooks, and React Router.

<a href="">View Deployed Site Here</a>


## Snapshot of Application

When the user visits the app, they will be asked to select an emoji representing their current generalized emotional affect: strongly negative, negative, neutral, positive, or strongly positive.

In the background, all of the articles’ titles and abstracts are processed by Dandelion’s Sentiment Analysis API and each given a sentiment score (from 0 (strongly negative) to 10 (strongly positive)). Based on the user's mood, they will see articles pulled from the NYT’s Top Stories API, sorted by sentiment.

The app keeps track of and updates the session’s affect score based on the affect of the articles that the user subsequently reads. The articles will be continually sorted and nudge the user toward sentimental balance. We don't filter the feed. If the user prefers not to indicate their mood, they can press 'skip' and the app will sort based only on the articles read.


## Technologies

<table>
    <tr>
        <td>TypeScript</td>
        <td>JavaScript</td>
        <td>React</td>
        <td>React Router</td>
        <td>React Hooks</td>
        <td>HTML</td>
        <td>CSS</td>
        <td>Figma</td>
        <td>Cypress</td>
        <td>Fetch API</td>
    </tr>
    </tr>
        <td><img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="typescript" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119360616-074c6580-bc68-11eb-8ac1-f1ca05b87bf8.png" alt="javascript" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119361040-74f89180-bc68-11eb-845a-29ec9f93f095.png" alt="react" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119361186-9d808b80-bc68-11eb-97ee-05bde2700716.png" alt="react router" width="100" height="auto" /></td>
        <td><img src="https://miro.medium.com/max/1400/1*-Ijet6kVJqGgul6adezDLQ.png" alt="react hooks" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119402191-d553f700-bc99-11eb-8cd3-6ef44023d530.png" alt="HTML" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119402395-1e0bb000-bc9a-11eb-9173-30403b8848d1.png" alt="css" width="100" height="auto" /></td>
        <td><img src="https://cdn.freebiesupply.com/logos/large/2x/figma-1-logo-png-transparent.png" alt="figma" width="100" height="auto" /></td>
        <td><img src="https://user-images.githubusercontent.com/73092355/119361263-b5f0a600-bc68-11eb-9f41-8e10aa013e7a.png" alt="Cypress" width="100" height="auto" /></td>
         <td><img src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/08/wall-2.jpeg" alt="Heroku" width="100" height="auto" /></td>
    </tr>
</table>

## Wins

- Learning and implementing TypeScript in a short amount of time
- Integrating data from two different APIs using fetch and asynchronous JS.
- Working asynchronously to tackle various parts of the project and resolving merge conflicts as they arose
- Implementing appropriate error handling and displaying error and loading messages to the user
- Making our application meet accessibility principles
- Utilizing resources such as web documents and mentors to expand knowledge base and maximize application performance
- Implementing features beyond our MVP, such as viewing articles by topic

## Challenges

- Applying TypeScript in a group project while learning it through different learning styles
- Keeping up with timely code reviews and merging
- Creating modular reusable components while implementing a multi-page website
- Implementing styling for a mobile-first application

## Future Features

- Fetching news data from multiple news sources and allowing the user to choose between them.
- Further modularizing components
- Accessing full articles so that the user can read them within the application

## Project Demo

**Sorting by Sentiment**

![Home Screen](https://user-images.githubusercontent.com/82003147/140839607-727971ca-9fe1-4982-bc1e-e24a9be417b3.gif)

**Changing Sentiment**

![Changing Sentiment](https://user-images.githubusercontent.com/82003147/140839713-79fc49d6-721f-48d9-89f2-f1a008fbe672.gif)

**Sorting by Topic**

![Sorting by Topic](https://user-images.githubusercontent.com/82003147/140839761-3af43274-1cb0-4609-9e0d-8d1ec323582e.gif)

## Contributors

This project was developed by:

- [Anthony Iacono](https://github.com/anthony-iacono)
- [Joshua Horner](https://github.com/jphorner)
- [Nadia Naji](https://github.com/najinl)
- [Natalia Zamboni Vergara](https://github.com/nzambonivergara)

[Project Spec](https://frontend.turing.edu/projects/module-3/stretch.html) provided by the Turing School of Software & Design.
