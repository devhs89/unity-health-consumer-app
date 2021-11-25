# UnityHealth Consumer Application
Melbourne Polytechnic - Capstone Project
## About the project
UnityHealth (UH) is a health information, education & technology consulting company. UH required a ChatBot & a Barcode Scanner feature integrated within their consumer app.
A team of four student developers built this application and implemented the requested features.
- Barcode scanner feature lets users search for products using barcodes.
- Interactions feature lets users view herb, drug, food and supplement interactions.
- AI ChatBot feature resolves customers’ basic & medical queries.

**This repository includes code for the user-interface, barcode scanner and interactions functionality only. To view ChatBot feature, go to - https://github.com/devhs89/unity-health-chatbot**

*Please note:*
1. *The application uses a free barcode lookup database API, that only provides limited results.*
2. *Authentication tokens for barcode lookup and IMgateway services have been removed from the source code. New tokens can be acquired by signing up to these services.*
3. *To rectify a technical error with a database, a local database was set up. Therefore, some API calls will have to be updated.*

## How to run the application -
1. Follow the instruction in the link below to set up the NativeScript development environment.
*https://docs.nativescript.org/environment-setup.html*
2. Run **ns doctor [android/ios]** to verify all dependencies are met.
3. Run **npm install** in the project's root directory.
4. Run **ns run [android/ios]** to run in normal mode.
5. Run **ns debug [android/ios]** to run in debug mode.
