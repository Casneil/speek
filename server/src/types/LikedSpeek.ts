import { objectType } from 'nexus'

export const LikedSpeek = objectType({
  name: 'LikedSpeek',
  definition(t) {
    t.model.id()
    t.model.speek()
    t.model.likedAt()
  },
})
