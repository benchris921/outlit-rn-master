import React from 'react'
import { View, ScrollView } from 'react-native'

import EventTitle from '../components/Event/EventTitle'
import EventLocation from '../components/Event/EventLocation'
import EventImages from '../components/ImageThumbSlider'
import EventDescription from '../components/Event/EventDescription'
import EventAction from '../components/Event/EventAction'

const styles = {
  infoContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
}

const items = [
  {source: 'https://cdn.londonandpartners.com/visit/london-organisations/cargo/72234-640x360-640-cargo.jpg'},
  {source: 'https://i.pinimg.com/474x/f9/e9/30/f9e9305d1aef3fe2db18838bdba7aab1.jpg'},
  {source: 'https://scoopwebsite.blob.core.windows.net/images/whatson/115795_lrg.png'},
  {source: 'https://djmag.com/sites/default/files/styles/djmag_landscape/public/top100/clubs/image/MARQUEE.jpg?itok=bKvlm-wg'},
  {source: 'https://qtxasset.com/files/nightclub/nodes/2011/4492/docs_thursday.jpg'},
  {source: 'https://s3-media2.fl.yelpcdn.com/bphoto/x7q8olgB78o57j_5Nx4KhQ/ls.jpg'},
  {source: 'https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAAh3AAAAJDlkYmRkYjdiLWUyOTctNDZmZi1iY2UwLTUwMmFmMGQyYmQxNA.jpg'},
  {source: 'https://img.grouponcdn.com/deal/aez5ViuGFdcezzAw8VBa/wA-2048x1229/v1/c700x420.jpg'},
]

const attendees = [
  {uri: 'https://www.incimages.com/uploaded_files/image/170x170/simon-sinek-headshot_34070.jpg'},
  {uri: 'https://media.glamour.com/photos/5695aa8e16d0dc3747ed3575/master/w_1250,c_limit/sex-love-life-2009-12-1207-02_party_pic_li.jpg'},
  {uri: 'https://lh3.googleusercontent.com/-j-_Hl3lNgMQ/U3d0CvZe9sI/AAAAAAAAAF8/Zk7AXFaDgOU/w530-h297-n/minion.jpg'},
]

export default Event = () => (
  <View style={{alignItems: 'stretch'}}>
    <EventTitle
      image="https://wwcdn.weddingwire.com/vendor/385001_390000/387615/thumbnails/800x800_1307026580377-1182552540UJectXL.jpg"
      title="Drayton's birthday party"
      date={new Date()}
    />
    <View style={styles.infoContainer}>
      <EventLocation
        region={{
          latitude: 37.769756,
          longitude: -122.465767,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        open="11:00 PM - 02:00 AM"
        locationName="Drayton's House"
        address1="212 Draper Rd NW, Blacksburg,"
        address2="VA 24060"
      />
      <EventImages items={items}/>
      <EventDescription
        hostName="Drayton Taylor"
        hostPic={{uri: "https://ae01.alicdn.com/kf/HTB18Sf2qHwTMeJjSszfq6xbtFXaR/Kids-Flower-Girl-Children-Wedding-Prom-Tiara-Crown-Headband-Kid-Size-Baby-Princess-Headband-Girls-Hair.jpg_640x640.jpg"}}
        desc="Nam suscipit iaculis ultricies. Praesent turpis massa, preto vitae varius scelerisque, fringilla id nibh."
      />
      <EventAction attendees={attendees} total={32} going={17} />
    </View>
  </View>
)
