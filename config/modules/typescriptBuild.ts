import { Options } from "@nuxt/typescript-build"

const TypescriptBuild: Options = {
  // Disabling type checking since we have it on our editor and don't want it to slow down the build process
  typeCheck: false,
}

export default TypescriptBuild
