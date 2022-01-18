<template>
  <div class="space-y-2">
    <Title size="xs">Welcome to my website!</Title>

    <CommandPaletteControls class="space-y-4">
      <Card :truncate="false" tight>
        Welcome to Command Palette, a tool to help you out! You can use this
        window everywhere on the website! Don't forget the key combination!
      </Card>

      <Card tight> Things you can do with this tool: </Card>

      <div class="grid grid-cols-2 overflow-x-auto">
        <Card :truncate="false" tight>
          View latest blog posts that you can read
        </Card>

        <Card :truncate="false" tight>
          Quick access to some pages on the website
        </Card>

        <Card :truncate="false" tight>
          View my recent activities on GitHub
        </Card>
        <Card :truncate="false" tight> Some of my social media accounts </Card>
      </div>

      <Card tight> Click on one of the items on the left to get started! </Card>
    </CommandPaletteControls>
  </div>
</template>
