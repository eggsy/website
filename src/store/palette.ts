import { Module, VuexModule, Mutation } from "vuex-module-decorators"

// Types
import type { Repository } from "../types/Response/GitHub"
import { Post } from "../types/Post"

@Module({
  name: "palette",
  stateFactory: true,
  namespaced: true,
})
class Palette extends VuexModule {
  visible = false
  repositories: Repository[] = []
  posts: Post[] = []

  @Mutation
  setRepositories(data: Repository[]) {
    this.repositories = data
  }

  @Mutation
  setPosts(data: Post[]) {
    this.posts = data
  }

  @Mutation
  toggleVisibility(value?: boolean) {
    this.visible = value !== undefined ? value : !this.visible
  }
}

export default Palette
