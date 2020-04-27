<!--

*** To avoid retyping too much info. Do a search and replace for the following:
*** vishal1995srinivas, Infinity, twitter_handle, vishal1995srinivas
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url]-->
[![Issues][issues-shield]][issues-url] 
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/vishal1995srinivas/Advanced">
    <img src="sf.png" alt="Logo" >
  </a>

  <h3 align="center">SICK FITS</h3>

  <p align="center">
    Basic Full stack E-commerce Website
    <br />
    <a href="https://github.com/vishal1995srinivas/Advanced"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://sikfits-prod.herokuapp.com">View Demo</a>
    ·
    <a href="https://github.com/vishal1995srinivas/Advanced/issues">Bugs</a>
    ·
    <a href="https://github.com/vishal1995srinivas/Advanced/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://sikfits-prod.herokuapp.com)

Thanks for checking out my first E-Commerce website.Sick fits involves all operations from selling of a product to checking out an item after payment.

# Stack Used 

## FRONTEND
* [ReactJS](https://reactjs.org/) <br>
        For building the interface with <br>
        <ul>
        <li>
        Next.js for server side rendering</li>
        <li>Routing and tooling </li>
        <li>Styled Components for styling</li>
        <li>React-Apollo for interfacing with Apollo Client</li>
        <li>Jest & Enzyme for Testing</li>
        </ul>
* [Apollo Client](https://www.apollographql.com/)<br>
For Data Management <br>
        <ul>
        <li>
       Performing GraphQL Mutations</li>
        <li>Fetching GraphQL Queries</li>
        <li>Caching GraphQL Data</li>
        <li>Managing Local State</li>
        <li>Error and Loading UI States</li>
        </ul>

## BACKEND
* [Prisma](http://prisma.io/)<br>
A GraphQL Database Interface<br>
        <ul>
        <li>
       Provides a set of GraphQL CRUD APIs for a MySQL,</li>
        <li>Postgres Database</li>
        <li>Schema Definition</li>
        <li>Data Relationships</li>
        <li>Self-hosted or as-a-service</li>
        </ul>


* [GraphQL-Yoga](http://graphql.com)<br>
An Express GraphQL Server For:<br>
        <ul>
        <li>
       Implementing Query and Mutation Resolvers</li>
        <li>Custom Server Side Logic</li>
        <li>Charging Credit Cards with Stripe</li>
        <li>Sending Email</li>
        <li>Performing JWT Authentication</li>
        <li>Checking Permissions</li>
        </ul>
<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Following steps lead you to run the app in your local system.
* npm
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the SickFits
```sh
git clone https://github.com/vishal1995srinivas/Advanced.git
```
2. Install NPM packages in both frontend and backend folders
```sh
npm install
```
3. Go to prisma and add the prisma secret with corresponding endpoint
 
4. Add Stripe Secret and mailtrap smtp config.

5. Run the backend server
```sh
npm run dev
```
This should start your graphql server.

6. Run the frontend server.
```sh
npm run dev
```
This should start the application.


<!-- USAGE EXAMPLES -->

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/vishal1995srinivas/Advanced/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Thanks for checking out this App. If you have a suggestion that would
make this better, please fork this app and create a pull request or simply open
an issue with the tag "enhancement".

Thanks again! Now go create something AMAZING! 😃.
Any contributions you make are **greatly appreciated**.

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact


Project Link: [https://github.com/vishal1995srinivas/Advanced](https://github.com/vishal1995srinivas/Advanced)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/vishal1995srinivas/Advanced/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: scrnshot.png
