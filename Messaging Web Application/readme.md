# Messaging-Web-Application Documentation

## Build Instructions
### Step 1 - Downloading Files: You have two options to downloading the files required for this project

1. Clone the entire repo using git
```
git clone https://github.com/Alexandru101/web-dev-projects.git
```

2. Download the entire repo manually
<img width="1393" height="653" alt="image" src="https://github.com/user-attachments/assets/751affe0-9890-438e-8d0f-499a115e3588" />

Once completed you can delete the projects you dont want (eg keep 'messaging web application' but delete the other projects that come with it) or just keep the entire folder, either way works. (Note we can use visual studio code to open any projects isnide this folder as its like a library of all my projects in one folder)

## Step 2 - Installing Dependancies: Open the project 'messaging web application' within your IDE. (it is prefferd to use [visual studio code](https://code.visualstudio.com/download))
Inside your IDE (visual studio code), you will need to open the terminal an execute the following command below
```
npm install
```
Once this is done the project should of downloaded all the required dependancies such as 'node_modules'

## Step 3 - Enviroment Variables: These keys are sensitive data so you must provide your own key and NOT share it with anyone!
As we are using supabase for our authentication and database we will need both supabase 'URL' and 'ANON' key. Note both of these keys can be found once you are logged inside [supabase](https://supabase.com/dashboard/sign-in?returnTo=%2Forg), if by any chance you dont know how to find the key you can use an [AI](https://duck.ai/) model to guide you or watch a [youtube video](https://www.youtube.com/watch?v=bS-4LohFtBk).

We also use groq's AI api as they offer free use and easy integration, however feel free to use a diffrent api such as google gemini. (Note using a diffrent api means you will have to change the code to meet the requirements of that api call as they are not all the same)
```
NEXT_PUBLIC_SUPABASE_URL=[Input key here]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Input key here]
NEXT_PUBLIC_GROQ_API_KEY=[Input key here]
```

## Step 4 - Building Project (Finale)
Once you have finished all the steps above open your IDE's (visual studio code) terminal and run this command below to build your project and run a live server. (Note you may need to download the live server extension on visual studio code, if you are not using visual studio code as your IDE then you will need to research what is required for you)
```
npm run dev
```
