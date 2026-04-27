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

```
NEXT_PUBLIC_SUPABASE_URL=[Input key here]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Input key here]
NEXT_PUBLIC_GROQ_API_KEY=[Input key here]
```
