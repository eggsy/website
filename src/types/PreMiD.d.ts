/*
  PreMiD Metadata interface
  Source: https://github.com/PreMiD/Presences/blob/master/@types/premid/index.d.ts
*/

export interface PresenceSetting {
  id: string
  /**
   * Needed for every setting except if you use `multiLanguage`.
   */
  title?: string
  /**
   * Needed for every setting except if you use `multiLanguage`.
   */
  icon?: string
  if?: Record<string, string | number | boolean>
  placeholder?: string
  value?: string | number | boolean
  values?: Array<string | number | boolean>
  /**
   * `false`: default, it disables multi-localization.
   *
   * `true`: use this if you are only going to use strings from the `general.json` file, of the  [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence).
   *
   * `string`: name of the file, excluding the extension (.json), inside the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence).
   *
   * `Array<string>`: if you are using more than one file, from inside of the [localization github repo](https://github.com/PreMiD/Localization/tree/master/src/Presence), you can specify all the values in an array. Only common languages of all the files will be listed.
   */
  multiLanguage?: boolean | string | Array<string>
}

export interface PresenceMetadata {
  /**
   * Should contain Object with name and id of the presence developer.
   *
   * Name is your Discord username without the identifier(#0000).
   *
   * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
   */
  author: {
    name: string
    id: string
  }
  /**
   * Should contain an Array of Objects with each Object having the name and id of the contributor.
   *
   * Name is your Discord username without the identifier(#0000).
   *
   * User id can be copied from Discord by enabling developer mode and right-clicking on your profile.
   */
  contributors?: Array<{
    name: string
    id: string
  }>
  /**
   * The title of the service that this presence supports. The folder name and service name should also be the same.
   */
  service: string
  /**
   * Alternative titles for the service which can be used for searching in the store.
   *
   * Useful for services that have different names in different countries or for services which have spaces in them, you can remove the space in the alternative name for easier searching.
   *
   * Note: This is **NOT** used for tags! Only for alternative names!
   */
  altnames?: Array<string>
  /**
   * Small description of the service.
   *
   * Your description must have key pair values which indicate the language, and the description in that specific language.
   *
   * Make descriptions with the languages that you know, our translators will make changes to your metadata file.
   *
   * Visit the link for all the language IDs.
   * @link https://api.premid.app/v2/langFile/list
   */
  description: Record<string, string>
  /**
   * URL of the service.
   *
   * Example: `vk.com`
   *
   * This url must match the url of the website as it will be used to detect wherever or not this is the website to inject the script to.
   *
   * This may only be used as an array when there are more than one urls.
   *
   * Note: Do **NOT** add `http://` or `https://` in the url or it will not work.
   */
  url: string | Array<string>
  /**
   * Version of your presence.
   *
   * Use Sematic Versioning; <MAJOR>.<MINOR>.<PATCH>
   *
   * @link https://semver.org/
   */
  version: string
  /**
   * Link to service's logo.
   *
   * Must end with .png/.jpg/etc.
   */
  logo: string
  /**
   * Link to service's thumbnail or picture of the website.
   *
   * Must end with .png/.jpg/etc.
   */
  thumbnail: string
  /**
   * `#HEX` value.
   *
   * We recommend to use a primary color of the service that your presence supports.
   */
  color: string
  /**
   * Array with tags, they will help users to search your presence on the website.
   */
  tags: Array<string>
  /**
   * A string used to represent the category the presence falls under.
   * @link https://docs.premid.app/dev/presence/metadata#presence-categories
   */
  category: "anime" | "games" | "music" | "socials" | "videos" | "other"
  /**
   * Defines whether `iFrames` are used.
   */
  iframe?: boolean
  /**
   * A regular expression string used to match urls.
   * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
   */
  regExp?: RegExp
  /**
   * A regular expression selector that selects iframes to inject into.
   * @link https://docs.premid.app/dev/presence/metadata#regular-expressions
   */
  iFrameRegExp?: RegExp
  /**
   * Defines whether `getLogs()` is used.
   */
  readLogs?: boolean
  button?: boolean
  warning?: boolean
  /**
   * An array of settings the user can change.
   * @link https://docs.premid.app/dev/presence/metadata#presence-settings
   */
  settings?: PresenceSetting[]
}
