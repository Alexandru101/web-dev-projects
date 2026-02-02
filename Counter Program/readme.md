# Simple Counter

## Step 1: Structuring the UI with HTML

We first start by creating a parent div to manage the overall layout. This contains a counter label and a nested div element for the buttons. By wrapping the buttons in their own container, we can easily switch their layout from a vertical column to a horizontal row using Flexbox.

- index.html file below
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="button__placement">
        <label class="counter__design" id="counter_label">0</label>

        <div class="button__container">
            <button class="button__design" id="decrease_button">Decrease</button>
            <button class="button__design" id="reset_button">Reset</button>
            <button class="button__design" id="increase_button">Increase</button>
        </div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

## Step 2: Styling UI

- style.css below
```
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #c2a0a0;
}

.counter__design {
    color: lightgreen;
    font-size: 150px;
}

.button__placement {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: #312e2e;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

.button__container {
    display: flex;
    gap: 15px;
}

.button__design {
    font-size: 2em;
}
```
