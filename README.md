# Final Year Project: Cleanzee - Cleaning Service App

![Thumbnail](cleaning-service-app.png)

## Overview

A mobile app development as part of my final year project, enabling customers to book cleaning services, with features such as search nearby cleaners and real-time chat.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Objectives](#objectives)
- [Project Scope](#project-scope)
    - [Purpose](#purpose)
    - [Core Features](#core-features)
    - [Limitations](#limitations)
- [System Overview](#system-overview)
    - [Functional Requirements](#functional-requirements)
    - [Non-Functional Requirements](#non-functional-requirements)

## Technology Stack

- **Front-End:** React Native (Expo)
- **Back-End:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Real-Time Communication:** Socket.IO
- **APIs:** Google Maps API, Cloudinary, Nodemailer
- **Development Tools:** Visual Studio Code, Android Studio
- **Version Control**: Sourcetree

## Objectives

1. To implement a geolocation feature to locate nearby individual cleaners or cleaning service providers.
2. To enhance the work experience and allow managing bookings and accessing customer ratings and feedback.
3. To enable the management of visibility, adjustment of prices, and tracking of earnings directly.

## Project Scope

### Purpose

1. Users can book cleaning services from cleaners or cleaning service providers.
2. Users can register as cleaners or cleaning service providers to make their services available for users needing cleaning services to book through a mobile application.

### Core Features

1. Payment Options
2. Geolocation
3. Rating and Reviews
4. Communication Tool
5. Booking System

### Limitations

1. **Payment Options**: Limited to only one or two payment options for users since this application is just an initial launch.
2. **Geolocation**: Limited to nearby searching for individual cleaners only, which means the search doesn't include cleaning service providers. 
3. **Geographic Limitation**: The booking and geolocation features will be restricted to users located in Malaysia, which mean users outside Malaysia can't use the application's services, as it is limited to operating within the country.

## System Overview

### Functional Requirements

<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Functions</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>FR1</td>
            <td>Register</td>
            <td>Users can register a new account</td>
        </tr>
        <tr>
            <td>FR2</td>
            <td>Login</td>
            <td>Users can log in to an existing account</td>
        </tr>
        <tr>
            <td>FR3</td>
            <td>Cleaner Registration</td>
            <td>Users can register as cleaners by providing the necessary details</td>
        </tr>
        <tr>
            <td>FR4</td>
            <td>Nearby Cleaners</td>
            <td>Customers can find nearby cleaners based on their area</td>
        </tr>
        <tr>
            <td>FR5</td>
            <td>Search</td>
            <td>This application allows customers to search for cleaners or cleaning services</td>
        </tr>
        <tr>
            <td>FR6</td>
            <td>Notifications</td>
            <td>This system notifies customers about the booking confirmation or cancellation while cleaners about customer booking requests</td>
        </tr>
        <tr>
            <td>FR7</td>
            <td>Ratings and Reviews</td>
            <td>Customers can leave ratings and reviews for the cleaners</td>
        </tr>
        <tr>
            <td>FR8</td>
            <td>Booking System</td>
            <td>This application allows customers to book cleaning services from cleaners</td>
        </tr>
    </tbody>
</table>

### Non-Functional Requirements

<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Functions</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>NFR1</td>
            <td>Maintainability</td>
            <td>This application should be easy to update and maintain with a clear and structure codebase</td>
        </tr>
        <tr>
            <td>NFR2</td>
            <td>Reliability</td>
            <td>This application should function correctly without crashes or errors</td>
        </tr>
        <tr>
            <td>NFR3</td>
            <td>Security</td>
            <td>This application protect user data, prevents unauthorized access, and ensures safe transactions</td>
        </tr>
        <tr>
            <td>NFR4</td>
            <td>Usability</td>
            <td>This application should provide a user-friendly interface for both customers and cleaners</td>
        </tr>
    </tbody>
</table>
