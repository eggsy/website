<template>
  <!-- JavaScript -->
  <svg
    v-if="isSame('JavaScript')"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#EFD81D"
  >
    <path
      d="M0 0v512h512V0H0zm274.286 397.714c0 49.84-29.44 74.137-72.057 74.137-38.492 0-60.835-19.931-72.172-43.988l39.177-23.714c7.555 13.405 13.292 24.742 29.783 24.742 13.714 0 24.983-6.182 24.983-30.24V237.714h50.286v160zm113.543 72.995c-44.675 0-73.543-20.16-87.635-48L339.429 400c10.285 16.846 23.714 28.069 47.428 28.069 19.932 0 31.509-8.823 31.509-22.572 0-16.491-11.92-22.331-33.92-32l-12.023-5.166c-34.72-14.765-57.737-33.325-57.737-72.514 0-36.08 27.485-62.434 70.445-62.434 30.595 0 52.572 9.508 68.4 37.348L416 294.857c-8.251-14.777-17.143-20.571-30.926-20.571-14.091 0-23.028 8.937-23.028 20.571 0 14.434 8.937 20.274 29.554 29.212l12.023 5.154c40.903 17.531 63.931 35.428 63.931 75.611.012 43.315-34.011 65.875-79.725 65.875z"
    />
  </svg>

  <!-- TypeScript -->
  <svg
    v-else-if="isSame('TypeScript')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0V0z" fill="#fff" />
    <path
      d="M0 12v12h24V0H0v12zm19.34-.956c.61.152 1.075.423 1.502.865.221.236.549.667.575.77.008.03-1.036.73-1.669 1.123-.022.015-.114-.083-.217-.236-.309-.45-.632-.644-1.128-.678-.727-.05-1.2.332-1.192.967a.88.88 0 00.103.45c.16.332.457.53 1.39.934 1.718.739 2.453 1.226 2.91 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.171-1.878-.647-2.442-1.272-.221-.244-.651-.88-.625-.926.011-.015.11-.076.221-.141l.892-.514.69-.4.145.213c.201.31.643.732.91.873.766.404 1.817.346 2.335-.118.221-.202.312-.412.312-.72 0-.279-.033-.4-.178-.61-.187-.266-.568-.49-1.65-.96-1.239-.533-1.772-.864-2.26-1.39a3.167 3.167 0 01-.659-1.2c-.091-.34-.114-1.189-.042-1.531.255-1.2 1.158-2.031 2.462-2.279.422-.08 1.406-.05 1.82.054v-.002zm-5.633 1.001l.007.983H10.59v8.876H8.381v-8.876H5.257v-.964l.027-.99c.01-.015 1.912-.022 4.217-.019l4.194.012.012.978z"
      fill="#007ACC"
    />
  </svg>

  <!-- Vue.js -->
  <svg
    v-else-if="isSame('Vue.js')"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M256 144.03l-55.49-96.11h-79.43L256 281.61 390.92 47.92h-79.43L256 144.03z"
      fill="#35495E"
    />
    <path
      d="M409.4 47.92L256 313.61 102.6 47.92H15.74L256 464.08 496.26 47.92H409.4z"
      fill="#41B883"
    />
  </svg>

  <!-- Nuxt.js -->
  <svg
    v-else-if="isSame('Nuxt.js')"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
  >
    <path
      d="M224.093 141.297l-11.838 20.842-40.483-71.297L47.494 309.683h84.144c0 11.511 9.178 20.842 20.498 20.842H47.494c-7.322 0-14.088-3.975-17.749-10.423a21.145 21.145 0 01.001-20.84l124.278-218.84C157.685 73.971 164.453 70 171.776 70c7.324 0 14.091 3.973 17.752 10.421l34.565 60.876z"
      fill="#00C58E"
    />
    <path
      d="M314.164 299.4l-77.876-137.123-11.837-20.842-11.838 20.842L134.746 299.4a21.147 21.147 0 00-.001 20.84c3.661 6.448 10.427 10.422 17.749 10.422H296.39c7.324 0 14.093-3.97 17.755-10.419a21.14 21.14 0 00.001-20.843h.018zm-161.67 10.421l71.957-126.702 71.939 126.702H152.494z"
      fill="#2D3748"
    />
    <path
      d="M369.484 320.104c-3.661 6.447-10.426 10.421-17.748 10.421h-55.704c11.321 0 20.498-9.331 20.498-20.842h35.163l-99.774-175.706-15.988 28.162-11.838-20.841 10.078-17.742c3.662-6.449 10.429-10.422 17.752-10.422 7.324 0 14.091 3.973 17.752 10.422l99.809 175.706a21.148 21.148 0 010 20.842z"
      fill="#108775"
    />
  </svg>

  <!-- Node.js -->
  <svg
    v-else-if="isSame('Node.js')"
    xmlns="http://www.w3.org/2000/svg"
    fill="#6FA660"
    viewBox="0 0 512 512"
  >
    <path
      d="M429.76 130.07L274.33 36.85a37 37 0 00-36.65 0L82.24 130.06A38.2 38.2 0 0064 162.83V349a38.26 38.26 0 0018.24 32.8L123 406.14l.23.13c20.58 10.53 28.46 10.53 37.59 10.53 32.14 0 52.11-20.8 52.11-54.29V182a8.51 8.51 0 00-8.42-8.58h-22.38a8.51 8.51 0 00-8.42 8.58v180.51a15 15 0 01-6.85 13.07c-5.9 3.6-14.47 2.84-24.14-2.15l-39.06-23.51a1.1 1.1 0 01-.48-.92V165.46a1.32 1.32 0 01.59-1.06l151.84-93a.82.82 0 01.73 0l151.93 93a1.34 1.34 0 01.55 1.1V349a1.28 1.28 0 01-.45 1l-152.06 90.65a1.22 1.22 0 01-.8 0l-38.83-23.06a7.8 7.8 0 00-7.83-.41l-.34.2c-10.72 6.35-13.6 8-23.54 11.62-1.62.59-5.43 2-5.76 5.77s3.29 6.45 6.51 8.32l51.9 31.87a35.67 35.67 0 0018.3 5.07h.58a35.87 35.87 0 0017.83-5.07l155.43-93.13A38.37 38.37 0 00448 349V162.83a38.21 38.21 0 00-18.24-32.76z"
    />
    <path
      d="M307.88 318.05c-37.29 0-45.24-10.42-47.6-27.24a8.43 8.43 0 00-8.22-7.32h-19.8a8.44 8.44 0 00-8.26 8.58c0 14.58 5.12 62.17 83.92 62.17 24.38 0 44.66-5.7 58.63-16.49S388 311.26 388 292.55c0-37.55-24.5-47.83-72.75-54.55-49.05-6.82-49.05-10.29-49.05-17.89 0-5.47 0-18.28 35.46-18.28 25.23 0 38.74 3.19 43.06 20a8.35 8.35 0 008.06 6.67h19.87a8.24 8.24 0 006.16-2.86 8.91 8.91 0 002.12-6.44c-2.57-35.55-28.56-53.58-79.24-53.58-46.06 0-73.55 20.75-73.55 55.5 0 38.1 28.49 48.87 71.29 53.33 50 5.17 50 12.71 50 19.37.03 10.38-4.28 24.23-41.55 24.23z"
    />
  </svg>

  <!-- PHP -->
  <svg
    v-else-if="isSame('PHP')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#prefix__clip0)" fill="#8B5CF6">
      <path
        d="M2.778 8.054h3.098c.91.01 1.569.354 1.977 1.03.409.677.544 1.6.405 2.772a6.6 6.6 0 01-.358 1.576c-.178.515-.424.98-.74 1.393-.386.526-.798.859-1.237 1-.44.142-.894.212-1.364.212H3.17l-.44 2.879H1.126L2.778 8.054zm1.353 1.727l-.694 4.545c.046.01.093.015.139.015h.162c.74.01 1.356-.086 1.85-.288.493-.212.824-.95.994-2.212.138-1.06 0-1.671-.417-1.833-.408-.161-.92-.237-1.537-.227-.093.01-.181.015-.266.015h-.243l.012-.015M10.088 5.16h1.596l-.451 2.894h1.433c.787.02 1.372.233 1.758.636.393.404.508 1.172.346 2.303l-.774 5.044h-1.619l.74-4.817c.077-.505.054-.863-.07-1.075-.122-.212-.388-.318-.797-.318l-1.283-.016-.948 6.226H8.424l1.664-10.876zM16.484 8.054h3.098c.91.01 1.568.354 1.977 1.03.408.677.543 1.6.404 2.772a6.6 6.6 0 01-.358 1.576c-.177.515-.424.98-.74 1.393-.385.526-.798.859-1.237 1-.44.142-.894.212-1.364.212h-1.387l-.44 2.879H14.83l1.654-10.862zm1.352 1.727l-.693 4.545c.046.01.092.015.138.015h.162c.74.01 1.357-.086 1.85-.288.493-.212.825-.95.994-2.212.139-1.06 0-1.671-.416-1.833-.409-.161-.921-.237-1.538-.227-.092.01-.18.015-.266.015h-.242l.011-.015"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path
          fill="#fff"
          transform="translate(1.125 4.875)"
          d="M0 0h21.813v14.291H0z"
        />
      </clipPath>
    </defs>
  </svg>

  <!-- Sass -->
  <svg
    v-else-if="isSame('Sass')"
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    viewBox="0 0 512 512"
    fill="#cf649a"
  >
    <path
      d="M511.78 328.07c-1.47-11.92-7.51-22.26-18-30.77a3.58 3.58 0 00-.43-.44l-.53-.38-.17-.12-5.57-4-.19-.14-.71-.5a3.5 3.5 0 00-.83-.35c-17.62-10.49-46.79-17.84-91.42-2.09-10.65-17.92-11.86-32.28-4.73-54.28 1.27-3.83.09-6.36-3.71-8-7.64-3.25-18.1-1.59-25.52.37-3.46.9-5.54 2.86-6.2 5.83-4.7 22-18.36 42.1-31.57 61.5l-.78 1.14c-8.14-17.26-6.45-30.63-.78-47.38 1.13-3.34.24-5.56-2.89-7.22-8.74-4.51-21.85-1.41-27.07.13-6.62 1.93-13.72 19.82-21.65 41.24-2 5.39-3.72 10-4.75 12.15-2.45 5-4.79 10.7-7.27 16.75-5.6 13.69-11.91 29.1-20.93 38.78-3.28-7.25 1.88-18.68 6.89-29.77 5.93-13.11 11.53-25.5 5.08-33.41a11.82 11.82 0 00-8.33-4.32 13.26 13.26 0 00-6.15 1c.67-5.65.7-10.11-.95-15.5-2.36-7.69-8.49-12-16.93-11.77-19.22.56-35.48 14.88-45.75 26.8-6.84 8-22 14.1-35.31 19.45-5.26 2.23-10.26 4.23-14.43 6.23-6.65-5.62-15.1-11.29-24-17.28-25-16.78-53.33-35.81-54.31-61.61-1.4-38.11 42-65.14 79.88-84.43 28.71-14.6 53.67-24.28 76.31-29.57 31.8-7.43 58.66-5.93 79.82 4.44 11.58 5.67 17 18 13.56 30.68-9 32.95-46.29 55.53-78.18 65.69-19.21 6.12-35.56 8.68-50 7.84-18.1-1.05-32.88-10.13-39.2-14a21.18 21.18 0 00-3.2-1.8l-.29-.07a3.21 3.21 0 00-3.19 1c-1.3 1.55-.84 4-.37 5.24 6.15 16.07 18.85 26.22 37.74 30.17a92.09 92.09 0 0018.78 1.79c44.21 0 100.62-25.49 121.34-46.48 14.13-14.3 24.42-29 28.68-54.35 4.45-26.55-13.55-45-31.89-53.5-44.57-20.57-95.19-12.44-129.81-2-40.5 12.21-82.4 34.41-114.94 60.93-40.12 32.67-54.62 63-43.12 90.25 11.81 27.93 40.61 45.4 68.46 62.3 9 5.45 17.56 10.64 25.27 16-2.32 1.13-4.69 2.28-7.1 3.43-23.38 11.33-49.9 24.08-64.61 45.15-10.68 15.35-12.68 30.63-5.94 45.42 3.6 7.87 10 13.21 18.89 15.87A50 50 0 0053 432c17.31 0 36.36-7 46.73-13.47 18.32-11.5 30.19-26.94 35.29-45.89 4.54-16.86 3.45-33.61-3.15-48.56l22.45-11.32c-10.83 36-2.53 57.5 6.59 69.36 3.36 4.37 9.42 7 16.19 7.12s13-2.43 16.52-6.77c6.66-8.25 11.58-17.9 16.11-27.55-.24 6.3.06 12.68 2.21 18.09 1.93 4.87 5.11 8.1 9.21 9.34 4.36 1.33 9.47.21 14.39-3.15 22.17-15.17 37.33-51.58 49.51-80.85 1.73-4.16 3.39-8.16 5-11.9a152.5 152.5 0 0012.5 31.07c1.18 2.14 1.08 3.08-.52 4.84-2.41 2.64-5.77 5.83-9.33 9.21-10.78 10.23-24.2 23-26 34.23-.7 4.5 2.4 8.6 7.21 9.53 14.47 2.88 31.9-1.33 46.64-11.25 13.4-9 18.44-21.55 15-37.19-3.33-15.06 4.27-33.76 22.59-55.62 3 12.53 7 22.66 12.52 31.53l-.15.12c-13.34 11.65-31.62 27.6-28.78 46.95a13.35 13.35 0 005.58 9.22 14.22 14.22 0 0011.2 2.06c17.47-3.67 30.62-11.06 40.18-22.57s6.07-24.27 2.85-34.17c25-6.78 47.26-6.61 68.1.5 11.7 4 20.09 10.57 24.93 19.64 6.09 11.41 2.8 21.94-9.29 29.65-3.71 2.37-5.5 3.82-5.61 5.65a2.65 2.65 0 001 2.23c1.4 1.15 5.72 3.15 15.49-3 9-5.65 14.28-13.34 15.63-23a39 39 0 00-.01-8.01zm-399.73 25.06l-.1 1.28c-1.56 14.64-9 27.4-22.15 38-8.26 6.66-17.23 10.75-25.25 11.53-5.6.54-9.67-.22-12.09-2.27-1.81-1.53-2.78-3.82-3-7-1.64-25.48 38.32-50.8 60.81-59.13a51.39 51.39 0 011.78 17.59zm102.35-71.86c-3.7 21.09-14.49 60.9-31.45 76.35-.81.74-1.49 1-1.8.93s-.55-.44-.8-1c-5.66-13.12-3.57-35.28 5-52.69 6.59-13.42 16-22.31 26.52-25a5.29 5.29 0 011.34-.19 1.58 1.58 0 011 .27 1.64 1.64 0 01.19 1.33zm83.49 76.88c-3.19 3.33-7.56 2.88-6.53 1.66l16.24-17.24c-1.31 5.93-5.18 10.84-9.71 15.58zm67.37-14.91a14.07 14.07 0 01-4.93 1.39c-.46-9.07 8.33-19.28 17-26.09 2.33 9.46-2.44 19.46-12.07 24.7z"
    />
  </svg>

  <!-- HTML5 -->
  <svg
    v-else-if="isSame('HTML5')"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#dd4b25"
  >
    <path
      d="M64 32l34.94 403.21L255.77 480 413 435.15 448 32zm308 132H188l4 51h176l-13.51 151.39L256 394.48l-98.68-28-6.78-77.48h48.26l3.42 39.29L256 343.07l53.42-14.92L315 264H148l-12.59-149.59H376.2z"
    />
  </svg>

  <!-- WordPress -->
  <svg
    v-else-if="isSame('WordPress')"
    xmlns="http://www.w3.org/2000/svg"
    class="prefix__ionicon"
    viewBox="0 0 512 512"
    fill="#3B82F6"
  >
    <path
      d="M259 271.3L226.2 367h-.1l-25.4 73.1c1.8.5 3.5.9 5.3 1.4h.3a192.51 192.51 0 0049.5 6.5 157 157 0 0024.9-1.8 184.3 184.3 0 0032.5-7.1c2.6-.8 5.2-1.7 7.8-2.6-2.8-6-8.8-19.3-9.1-19.9zM80.8 180.5C70.8 203.1 64 230.9 64 256c0 6.3.3 12.6.9 18.8 6.9 71.2 52.9 131 116.1 157.9 2.6 1.1 5.3 2.2 8 3.2L96 180.6c-8-.3-9.5.2-15.2-.1z"
    />
    <path
      d="M430.2 175.4a188 188 0 00-15.1-26.6c-1.6-2.4-3.4-4.8-5.1-7.2A193 193 0 00325.1 77a189.2 189.2 0 00-69.2-13 191.51 191.51 0 00-149.4 71.7A196 196 0 0089 161.3c14.2.1 31.8.1 33.8.1 18.1 0 46-2.2 46-2.2 9.4-.6 10.4 13.1 1.1 14.2 0 0-9.4 1.1-19.8 1.6L213 362l37.8-113.3-26.8-73.6c-9.4-.5-18.1-1.6-18.1-1.6-9.4-.5-8.2-14.8 1-14.2 0 0 28.5 2.2 45.5 2.2 18.1 0 46-2.2 46-2.2 9.3-.6 10.5 13.1 1.1 14.2 0 0-9.3 1.1-19.7 1.6l62.3 185.6 17.3-57.6c8.7-22.4 13.1-40.9 13.1-55.7 0-21.3-7.7-36.1-14.3-47.6-8.7-14.3-16.9-26.3-16.9-40.4 0-15.9 12-30.7 29-30.7h2.2c26.2-.7 34.8 25.3 35.9 43v.6c.4 7.2.1 12.5.1 18.8 0 17.4-3.3 37.1-13.1 61.8l-39 112.8-22.3 65.7c1.8-.8 3.5-1.6 5.3-2.5 56.7-27.4 98-82 106.7-146.7a172.07 172.07 0 001.9-26 191.11 191.11 0 00-17.8-80.8z"
    />
    <path
      d="M256 48a208.06 208.06 0 0181 399.66A208.06 208.06 0 01175 64.34 206.7 206.7 0 01256 48m0-16C132.29 32 32 132.29 32 256s100.29 224 224 224 224-100.29 224-224S379.71 32 256 32z"
    />
  </svg>

  <!-- Tailwind CSS -->
  <svg
    v-else-if="isSame('Tailwind CSS')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.333 9.933C7.088 6.911 8.978 5.4 12 5.4c4.533 0 5.1 3.4 7.367 3.967 1.511.377 2.833-.189 3.966-1.7-.755 3.022-2.644 4.533-5.666 4.533-4.534 0-5.1-3.4-7.367-3.967-1.511-.378-2.833.189-3.967 1.7zm-5.666 6.8C1.422 13.711 3.31 12.2 6.333 12.2c4.534 0 5.1 3.4 7.367 3.967 1.51.377 2.833-.19 3.967-1.7C16.91 17.489 15.022 19 12 19c-4.533 0-5.1-3.4-7.367-3.967-1.511-.378-2.833.189-3.966 1.7z"
      fill="url(#prefix__paint0_linear)"
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1=".667"
        y1="-6.689"
        x2="23.333"
        y2="31.089"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#2383AE" />
        <stop offset="1" stop-color="#6DD7B9" />
      </linearGradient>
    </defs>
  </svg>

  <!-- Windi CSS -->
  <svg
    v-else-if="isSame('Windi CSS')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#prefix__prefix__clip0)">
      <path
        d="M12.694 4.687A3.97 3.97 0 008.729.72c-2.304 0-3.682 1.728-3.682 3.4h2.266c0-.471.44-1.134 1.416-1.134.938 0 1.7.763 1.7 1.7 0 .937-.684 1.7-2.409 1.7H1.85v2.266h6.17c2.912 0 4.675-1.78 4.675-3.966zm0 0A3.97 3.97 0 008.729.72c-2.304 0-3.682 1.728-3.682 3.4h2.266c0-.471.44-1.134 1.416-1.134.938 0 1.7.763 1.7 1.7 0 .937-.684 1.7-2.409 1.7H1.85v2.266h6.17c2.912 0 4.675-1.78 4.675-3.966z"
        fill="url(#prefix__prefix__paint0_linear)"
      />
      <path
        d="M17.722 19.313a3.97 3.97 0 01-3.966 3.966c-2.305 0-3.683-1.728-3.683-3.4h2.267c0 .471.44 1.134 1.416 1.134.937 0 1.7-.763 1.7-1.7 0-.937-.862-1.7-2.409-1.7H6.2v-2.266h6.847c2.911 0 4.675 1.78 4.675 3.966zm0 0a3.97 3.97 0 01-3.966 3.966c-2.305 0-3.683-1.728-3.683-3.4h2.267c0 .471.44 1.134 1.416 1.134.937 0 1.7-.763 1.7-1.7 0-.937-.862-1.7-2.409-1.7H6.2v-2.266h6.847c2.911 0 4.675 1.78 4.675 3.966z"
        fill="url(#prefix__prefix__paint1_linear)"
      />
      <path
        d="M18.316 4.217c-2.5 0-4.263 1.901-4.263 4.401h2.008c0-1.243.902-2.145 2.255-2.145 1.354 0 2.03.902 2.03 2.145 0 1.243-.878 2.266-3.27 2.266H1.849v2.267h15.565c3.542 0 5.188-2.277 5.188-4.533 0-2.5-1.691-4.4-4.286-4.4z"
        fill="url(#prefix__prefix__paint2_linear)"
      />
      <path
        d="M4.82 15.347H1.849v2.286h2.97v-2.286z"
        fill="url(#prefix__prefix__paint3_linear)"
      />
    </g>
    <defs>
      <linearGradient
        id="prefix__prefix__paint0_linear"
        x1="3.653"
        y1="2.638"
        x2="16.737"
        y2="23.279"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".078" stop-color="#54C8F1" />
        <stop offset=".573" stop-color="#41A2EF" />
        <stop offset="1" stop-color="#3386EE" />
      </linearGradient>
      <linearGradient
        id="prefix__prefix__paint1_linear"
        x1="3.653"
        y1="2.638"
        x2="16.737"
        y2="23.279"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".078" stop-color="#54C8F1" />
        <stop offset=".573" stop-color="#41A2EF" />
        <stop offset="1" stop-color="#3386EE" />
      </linearGradient>
      <linearGradient
        id="prefix__prefix__paint2_linear"
        x1="3.653"
        y1="2.638"
        x2="16.737"
        y2="23.279"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".078" stop-color="#54C8F1" />
        <stop offset=".573" stop-color="#41A2EF" />
        <stop offset="1" stop-color="#3386EE" />
      </linearGradient>
      <linearGradient
        id="prefix__prefix__paint3_linear"
        x1="3.653"
        y1="2.638"
        x2="16.737"
        y2="23.279"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".078" stop-color="#54C8F1" />
        <stop offset=".573" stop-color="#41A2EF" />
        <stop offset="1" stop-color="#3386EE" />
      </linearGradient>
      <clipPath id="prefix__prefix__clip0">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>

  <!-- Figma -->
  <svg
    v-else-if="isSame('Figma')"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.25 19c1.794 0 3.25-1.344 3.25-3v-3H7.25c-1.793 0-3.249 1.344-3.249 3s1.456 3 3.25 3z"
      fill="#0ACF83"
    />
    <path
      d="M4.001 10c0-1.656 1.456-3 3.25-3H10.5v6H7.25c-1.793 0-3.249-1.344-3.249-3z"
      fill="#A259FF"
    />
    <path
      d="M4.002 4c0-1.656 1.455-3 3.249-3h3.25v6H7.25C5.457 7 4 5.656 4 4z"
      fill="#F24E1E"
    />
    <path
      d="M10.5 1h3.25c1.793 0 3.249 1.344 3.249 3s-1.456 3-3.25 3H10.5V1z"
      fill="#FF7262"
    />
    <path
      d="M16.999 10c0 1.656-1.456 3-3.25 3-1.793 0-3.249-1.344-3.249-3s1.456-3 3.25-3c1.793 0 3.249 1.344 3.249 3z"
      fill="#1ABCFE"
    />
  </svg>

  <!-- Firebase -->
  <svg
    v-else-if="isSame('Firebase')"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <mask
      id="prefix__a"
      maskUnits="userSpaceOnUse"
      x="3"
      y="1"
      width="14"
      height="19"
    >
      <path
        d="M15.299 5.14a.412.412 0 00-.697-.225l-2.121 2.134-1.68-3.176a.4.4 0 00-.718 0L9.172 5.61 6.866 1.341c-.185-.347-.707-.255-.769.133L3.884 15.625l5.933 3.319a1.25 1.25 0 001.199 0L17 15.625 15.299 5.14z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#prefix__a)">
      <path
        d="M15.299 5.14a.412.412 0 00-.697-.225l-2.121 2.134-1.68-3.176a.4.4 0 00-.718 0L9.172 5.61 6.866 1.341c-.185-.347-.707-.255-.769.133L3.884 15.625l5.933 3.319a1.25 1.25 0 001.199 0L17 15.625 15.299 5.14z"
        fill="url(#prefix__prefix__prefix__paint0_linear)"
      />
      <path
        d="M3.884 15.625L6.108 1.474c.061-.388.584-.48.768-.133L9.171 5.61l.912-1.736a.41.41 0 01.728 0L17 15.625H3.884z"
        fill="#FFA000"
      />
      <path
        fill="url(#prefix__prefix__prefix__pattern0)"
        d="M3.064 4.7h8.915v11.333H3.064z"
      />
      <path
        d="M11.549 10.112L9.16 5.609 3.884 15.625l7.665-5.513z"
        fill="#F57C00"
      />
      <path
        fill="url(#prefix__prefix__prefix__pattern1)"
        d="M3.474 3.884H17.82v15.724H3.474z"
      />
      <path
        d="M17 15.626L15.299 5.14a.412.412 0 00-.697-.225L3.884 15.625l5.933 3.319a1.25 1.25 0 001.199 0L17 15.626z"
        fill="#FFCA28"
      />
      <path
        d="M15.299 5.14a.411.411 0 00-.697-.225l-2.121 2.134-1.68-3.176a.4.4 0 00-.718 0L9.172 5.61 6.866 1.341c-.185-.347-.707-.255-.769.133L3.884 15.625h-.01l.01.01.062.031 8.525-8.515 2.131-2.124a.413.413 0 01.697.225l1.68 10.384.021-.01-1.701-10.487zM3.904 15.604L6.108 1.576c.061-.388.584-.48.768-.133l2.295 4.268.912-1.736a.41.41 0 01.728 0l1.64 3.104-8.546 8.526z"
        fill="#fff"
        fill-opacity=".2"
      />
      <path
        opacity=".2"
        d="M11.016 18.842a1.25 1.25 0 01-1.2 0l-5.922-3.309-.01.092 5.933 3.319a1.25 1.25 0 001.199 0L17 15.625l-.01-.092-5.974 3.309z"
        fill="#A52714"
      />
      <path
        d="M15.299 5.14a.412.412 0 00-.697-.225l-2.121 2.134-1.68-3.176a.4.4 0 00-.718 0L9.172 5.61 6.866 1.341c-.185-.347-.707-.255-.769.133L3.884 15.625l5.933 3.319a1.25 1.25 0 001.199 0L17 15.625 15.299 5.14z"
        fill="url(#prefix__prefix__prefix__paint1_linear)"
      />
    </g>
    <defs>
      <linearGradient
        id="prefix__prefix__prefix__paint0_linear"
        x1="3.427"
        y1="4.185"
        x2="19.748"
        y2="12.847"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#fff" stop-opacity=".1" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="prefix__prefix__prefix__paint1_linear"
        x1="3.427"
        y1="4.185"
        x2="19.748"
        y2="12.847"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#fff" stop-opacity=".1" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <pattern
        id="prefix__prefix__prefix__pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlink:href="#prefix__prefix__prefix__image0"
          transform="scale(.0115 .00893)"
        />
      </pattern>
      <pattern
        id="prefix__prefix__prefix__pattern1"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlink:href="#prefix__prefix__prefix__image1"
          transform="scale(.00714 .00645)"
        />
      </pattern>
      <image
        id="prefix__prefix__prefix__image0"
        width="87"
        height="112"
        xlink:href="data:image/png;base64,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"
      />
      <image
        id="prefix__prefix__prefix__image1"
        width="140"
        height="155"
        xlink:href="data:image/png;base64,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"
      />
    </defs>
  </svg>

  <!-- Linux -->
  <svg
    v-else-if="isSame('Linux')"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-.068 3.262.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057a2.924 2.924 0 01-1.155.835c-1.652.72-.441 1.925-.898 2.78a1.57 1.57 0 00-.192.74c0 .75.596 1.399 1.679 1.302 1.461-.13 2.809.905 3.681.905.77 0 1.402-.438 1.696-1.041 1.377-.339 3.077-.296 4.453.059.247.691.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475.674-.225 1.013-.879 1.013-1.488 0-.39-.139-.761-.419-.988zM11.434 8.584c-.319 0-.583-.258-1-.568-.528-.392-1.065-.618-1.059-1.03 0-.283.379-.37.869-.681.526-.333.731-.671 1.249-.671.53 0 .69.268 1.41.579.708.307 1.201.427 1.201.773 0 .355-.741.609-1.158.868-.613.378-.928.73-1.512.73zm1.665-5.215c.882.141.981 1.691.559 2.454l-.355-.145c.184-.543.181-1.437-.435-1.494-.391-.036-.643.48-.697.922a1.686 1.686 0 00-.523-.127c.062-.923.658-1.737 1.451-1.61zM9.696 3.7c.676-.168 1.075.618 1.078 1.435l-.31.19c-.042-.343-.195-.897-.579-.779-.411.128-.344 1.083-.115 1.279l-.306.17c-.42-.707-.419-2.133.232-2.295zM7.581 22.943c-1.963-.893-2.63-.69-3.005-.69-.777 0-1.031-.579-.739-1.127.248-.465.171-.952.11-1.343-.094-.599-.111-.794.478-1.052.815-.346 1.177-.791 1.447-1.124.758-.937 1.523.537 2.15 1.85.407.851 1.208 1.282 1.455 2.225.227.871-.71 1.801-1.896 1.261zm6.987-1.874c-1.384.673-3.147.982-4.466.299-.195-.563-.507-.927-.843-1.293.539-.142.939-.814.46-1.489-.511-.721-1.555-1.224-2.61-2.04-.987-.763-1.299-2.644.045-4.746-.655 1.862-.272 3.578.057 4.069.068-.988.146-2.638 1.496-4.615.681-.998.691-2.316.706-3.14l.62.424c.456.337.838.708 1.386.708.81 0 1.258-.466 1.882-.853.244-.15.613-.302.923-.513.52 2.476 2.674 5.454 2.795 7.15.501-1.032-.142-3.514-.142-3.514.842 1.285.909 2.356.946 3.67.589.241 1.221.869 1.279 1.696l-.245-.028c-.126-.919-2.607-2.269-2.83-.539-1.19.181-.757 2.066-.997 3.288-.11.559-.314 1.001-.462 1.466zm4.846-.041c-.985.38-1.65 1.187-2.107 1.688-.88.966-2.044.503-2.168-.401-.131-.966.36-1.493.572-2.574.193-.987-.023-2.506.431-2.668.295 1.753 2.066 1.016 2.47.538.657 0 .712.222.859.837.092.385.219.709.578 1.09.418.447.29 1.133-.635 1.49zm-8-13.006c-.651 0-1.138-.433-1.534-.769-.203-.171.05-.487.253-.315.387.328.777.675 1.281.675.607 0 1.142-.519 1.867-.805.247-.097.388.285.143.382-.704.277-1.269.832-2.01.832z"
    />
  </svg>

  <!-- PreMiD -->
  <svg
    v-else-if="isSame('PreMiD')"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M459.17 105H52.83a30.35 30.35 0 00-30.34 30.34v241.32A30.35 30.35 0 0052.83 407h406.34a30.35 30.35 0 0030.34-30.34V135.34A30.35 30.35 0 00459.17 105zm-185 94.4a13.93 13.93 0 019.9-4.11h90.29a14 14 0 010 28H284a14 14 0 01-9.9-23.91zm-63.64 63.11L92.14 330.83a7.51 7.51 0 01-11.27-6.51V187.68a7.51 7.51 0 0111.27-6.51l118.34 68.32a7.52 7.52 0 010 13.02zm231.28 50.09a13.93 13.93 0 01-9.9 4.11H284a14 14 0 010-28h147.91a14 14 0 019.9 23.91zm0-46.7a13.93 13.93 0 01-9.9 4.11H284a14 14 0 010-28h147.91a14 14 0 019.9 23.91z"
    />
  </svg>

  <!-- Play Store -->
  <svg
    v-else-if="isSame('PlayStore')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#prefix__prefix__clip0)">
      <path
        d="M16.751 15.057c2.536-1.301 4.458-2.293 4.624-2.37.53-.263 1.078-.96 0-1.502-.348-.17-2.22-1.13-4.624-2.369l-3.331 3.143 3.331 3.098z"
        fill="#FFD900"
      />
      <path
        d="M13.42 11.96L2.812 21.947c.249.03.53-.03.862-.201.695-.356 8.071-4.12 13.077-6.69L13.42 11.96z"
        fill="#F43249"
      />
      <path
        d="M13.42 11.96l3.33-3.13S4.42 2.544 3.674 2.173a1.37 1.37 0 00-.878-.156L13.42 11.96z"
        fill="#00EE76"
      />
      <path
        d="M13.42 11.96L2.796 2.016C2.364 2.11 2 2.467 2 3.194v17.577c0 .666.282 1.146.812 1.192L13.42 11.96z"
        fill="#00D3FF"
      />
    </g>
    <defs>
      <clipPath id="prefix__prefix__clip0">
        <path fill="#fff" transform="translate(2 2)" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>

  <!-- App Store -->
  <svg
    v-else-if="isSame('AppStore')"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.818 1h12.364A4.818 4.818 0 0123 5.818v12.364A4.818 4.818 0 0118.182 23H5.818A4.818 4.818 0 011 18.182V5.818A4.818 4.818 0 015.818 1z"
      fill="url(#prefix__paint0_linear)"
    />
    <path
      d="M8.05 16.968h.003L7.3 18.273a.994.994 0 11-1.722-.995l.554-.96.054-.092c.094-.136.329-.372.798-.327 0 0 1.103.12 1.183.693 0 0 .01.188-.116.377zm10.67-3.327h-2.346c-.16-.011-.23-.068-.257-.101l-.002-.003-2.511-4.35-.003.003-.15-.216c-.248-.378-.64.588-.64.588-.467 1.075.067 2.298.253 2.668l3.488 6.04a.994.994 0 101.722-.994l-.872-1.51c-.017-.037-.047-.136.132-.137h1.185a.994.994 0 000-1.989zm-4.557 1.351s.125.637-.359.637H5.133a.994.994 0 010-1.989h2.23c.36-.02.444-.228.444-.228h.002l2.91-5.04a.222.222 0 000-.203l-.96-1.665a.994.994 0 111.722-.994l.445.772.445-.77a.994.994 0 011.723.994l-4.05 7.013c-.017.043-.023.11.109.121h2.42v.024s1.4.022 1.59 1.328z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1="12"
        y1="1"
        x2="12"
        y2="23"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#17C9FB" />
        <stop offset="1" stop-color="#1A74E8" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    brand: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    /**
     * Checks if passed value matches with the prop value.
     * @prop {string} value
     * @returns {boolean}
     */
    isSame(value: string): boolean {
      return this.brand?.toLowerCase() === value?.toLowerCase()
    },
  },
})
</script>
