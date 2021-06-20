<template>
  <list-view :items="meetupsWithCoverAndBadge">
    <template #default="slotProps">
      <list-view-card
        :key="slotProps.item.id"
        tag="router-link"
        :to="{ name: 'meetup', params: { meetupId: slotProps.item.id } }"
        :title="slotProps.item.title"
        :cover="slotProps.item.cover"
        :badge="slotProps.item.badge"
        :badge-success="slotProps.item.badgeSuccess"
      >
        <meetup-info :date="slotProps.item.date" :place="slotProps.item.place" :organizer="slotProps.item.organizer" />
      </list-view-card>
    </template>
  </list-view>
</template>

<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';
import MeetupInfo from './MeetupInfo';
import { getImageUrlByImageId } from '../data';

export default {
  name: 'MeetupsList',

  components: { ListView, ListViewCard, MeetupInfo },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsWithCoverAndBadge() {
      return this.meetups.map((meetup) => {
        const newMeetup = { ...meetup };
        if (meetup.attending) {
          newMeetup.badge = 'Участвую';
          newMeetup.badgeSuccess = true;
        } else if (meetup.organizing) {
          newMeetup.badge = 'Организую';
        }
        newMeetup.cover = meetup.imageId && getImageUrlByImageId(meetup.imageId);
        newMeetup.date = new Date(meetup.date);
        return newMeetup;
      });
    },
  },
};
</script>

<style></style>
