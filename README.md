# Cinema Booking App Setup Guide 🎬

Follow these steps to get the Cinema Booking App up and running smoothly.

---

## Important Notes 📝

- For a smoother experience, connect your laptop to a strong Wi-Fi internet connection. 📶  
- Before running the app, update the `BASE_URL` and `LAPTOP_IPV4` values in the `cinema_booking_app_mobile` folder to match your laptop's IPv4 address.
  <img width="940" height="294" alt="image" src="https://github.com/user-attachments/assets/78ef8ddb-249e-40b1-ad63-c2dc5b714e14" />
- Need help finding your IPv4 address? This link might help:  
  [How to find your IP address](https://www.avast.com/c-how-to-find-ip-address)  
- If you encounter any issues or need clarification, feel free to reach out via LinkedIn or WhatsApp. Thanks! 🙏

---

## Clone the Project 💻

1. Clone the project repository using git:
    ```bash
    git clone <repository-url>
    ```
2. Open the project folder in your preferred code editor, such as Visual Studio Code.

---

## Run the Server Locally 🌐

1. Open a terminal and navigate to the base directory of the project.  
2. Change directory to the server folder:
    ```bash
    cd server
    ```
3. Install the required dependencies (run this command **twice** to avoid potential issues):
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    node index.js
    ```

---

## Run the Mobile App 📱

1. Open a new terminal window and ensure you're in the project's base directory.  
2. Go to the `cinema_booking_app_mobile` folder and update `BASE_URL` and `LAPTOP_IPV4` to your laptop's IPv4 address.  
3. Navigate to the mobile app directory:
    ```bash
    cd cinema_booking_app_mobile
    ```
4. Install dependencies (run this command **twice**):
    ```bash
    npm install
    ```
5. Start the Expo development server:
    ```bash
    npx expo start
    ```
6. When the QR code appears, press the corresponding key to run on your preferred device:  
   - Press `a` to run on an Android emulator.  
   - Press `i` to run on an iOS simulator (macOS only).  
   - Press `w` to run in the web browser.
     
     <img width="528" height="300" alt="image" src="https://github.com/user-attachments/assets/b051a3f0-11fe-4612-bd82-01a7aba29f4d" />


---

## Run on a Real Android Device 🤖

1. Enable **Developer Mode** and **USB Debugging** on your Android phone.  
2. Ensure both your laptop and phone are connected to the **same Wi-Fi network**.  
3. Connect your laptop and phone using a USB cable.  
4. In the `cinema_booking_app_mobile` folder, confirm `BASE_URL` and `LAPTOP_IPV4` are set to your laptop’s IPv4 address.  
5. In the Expo terminal, select your physical phone device to run the app on.

May refer link here for more info  [Running on device](https://reactnative.dev/docs/running-on-device)

---

## Test Real-Time Seat Booking 🍿

1. In the Expo terminal, press `w` to open the app in a web browser.  
2. Open **two separate browser windows** (Window A and Window B).  
3. In **Window A**, select a specific seat. You should see the same seat become locked in **Window B**, demonstrating real-time booking functionality.

<img width="400" height="602" alt="image" src="https://github.com/user-attachments/assets/5570c8a7-467b-4826-8361-ae6dcf3cb8bf" />

---

## User Interface
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/317d6bc5-5977-45e5-bca7-0823c7920228" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/2969bf3d-583c-4776-b5e4-a349eb44a10f" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/4076361e-1256-4b0e-a501-9945bb7ced85" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/3affd7dc-1e05-4fd9-a060-0172e2255fd4" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/88c9ee7a-e00a-45c2-9afc-c7681c52499d" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/ebe8bdfe-20a9-41dd-8d50-f24917c481bc" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/f4ffe5dc-9069-43ec-8925-6ee59b2befdf" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/cd1fb0ca-be87-4584-9be1-2ea0872e9d78" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/3f63f546-59f8-4609-828e-0fd1c306bd32" />
