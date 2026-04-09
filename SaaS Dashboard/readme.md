# SaaS-Dashboard
<img width="1897" height="934" alt="image" src="https://github.com/user-attachments/assets/56cc58c6-c5ac-4703-95b0-a3d39cb11e6c" />

## Build Instructions

### Step 1 - Cloning Repo / Downloading Repo
- You can clone the repo using the git command below, if you are using git
```
git clone https://github.com/Alexandru101/web-dev-projects.git
```
then you can safely delete all the folders you dont need if you are just trying to build the SaaS-Dashboard
<img width="479" height="328" alt="image" src="https://github.com/user-attachments/assets/443bf974-823b-42d6-ba6d-9ff54e885e9a" /><br />

- or if you are not using git, you can just download the entire folder
<img width="1383" height="634" alt="image" src="https://github.com/user-attachments/assets/effa4cd5-cbde-4414-90da-1e478bd113fb" />

yes both methods are downloading the whole repo which is not the most optimised way but the way I organised this repo, it might be the only way 💀

### Step 2 - Installing Dependencies
- Open the entire project ("SaaS Dashboard") inside your IDE. Its recommended you use visual studio code

once your in your ide open your terminal and run this command
<img width="1894" height="1001" alt="image" src="https://github.com/user-attachments/assets/ac17c79b-b6c2-4ed6-ada6-fd3226d8f99d" />
<img width="1239" height="903" alt="image" src="https://github.com/user-attachments/assets/0dad2103-e6af-4c8b-91be-4e88fdf22e83" />

```
npm install
```

This basically just downloads all the requirments for the project using the .gitignore file which just tells it what to download

### step 3 - Enviroment Variables
Inside the .env.local file you must fill these keys out which you can find in your github account settings
```
AUTH_SECRET=YOUR_SECRET_KEY
AUTH_GITHUB_ID=YOUR_GITHUB_ID
AUTH_GITHUB_SECRET=YOUR_GITHUB_SECRET
```
DO NOT SHARE THESE KEYS (very dangerous if someone was to steal your secret keys 😏)

### Step 4 - Running Live Local Server
The last step is to run this command
```
npm run dev
```
then it should be http://localhost:3000/ inside your browser but you can also wait for it to finish setting up and it will give you a clickable link so it will open the website for you
<img width="1290" height="437" alt="image" src="https://github.com/user-attachments/assets/e45a4e4d-8a5d-4126-844c-c4b3a166bfa5" />
