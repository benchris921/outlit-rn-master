import React from 'react'
import { View, ScrollView } from 'react-native'

import VenuTitle from '../components/Venue/VenueTitle'
import VenueLocation from '../components/Venue/VenueLocation'
import VenueImages from '../components/ImageThumbSlider'
import VenueDescription from '../components/Venue/VenueDescription'
import VenueContent from '../components/Venue/VenueContent'
import VenueFeatures from '../components/Venue/VenueFeatures'
import VenueFoods from '../components/Venue/VenueFoods'
import VenueReview from '../components/Venue/VenueReview'

const styles = {
  infoContainer: {
    padding: 10,
    backgroundColor: 'white'
  }
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

const foods = [
  {
    name: 'River Mill Cheese Fries',
    price: 5.25,
    description: 'A double order of fries covered in cheese Bacon, jalapenos, and chives served with a side of ranch'
  },
  {
    name: 'French Fries',
    price: 1.75,
    description: 'A basked of our seasoned fires'
  },
  {
    name: 'Chips and Salsa',
    price: 1.75,
    description: 'Our homemade tortilla chips served with salad'
  },
]

const reviews = [
  { stars: 4, type: 'Facebook', count: 40 },
  { stars: 3, type: 'FourSquare', count: 67 },
  { stars: 5, type: 'BeerAdvocate', count: 19 },
]

export default Venue = () => (
  <ScrollView>
    <VenuTitle
      image="https://wwcdn.weddingwire.com/vendor/385001_390000/387615/thumbnails/800x800_1307026580377-1182552540UJectXL.jpg"
      title="Rivermill"
      distance="2"
      dRating={3}
    />
    <View style={styles.infoContainer}>
      <VenueLocation
        region={{
          latitude: 37.769756,
          longitude: -122.465767,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        open="11:00 PM - 02:00 AM"
        phone="(540) 951-2483"
        site="rivermill.bar.com"
        address1="212 Draper Rd NW, Blacksburg,"
        address2="VA 24060"
      />
      <VenueImages items={items}/>
      <VenueDescription
        desc="Nam suscipit iaculis ultricies. Praesent turpis massa, preto vitae varius scelerisque, fringilla id nibh."
      />
      <VenueContent />
      <VenueFeatures
        features={[
          {feature: "Dog friendly"},
          {feature: "Outdoor seating"},
        ]}
      />
      <VenueFoods
        foods={foods}
        category="Appetizers"
      />
      <VenueReview reviewCount={126} reviews={reviews} likes={46} />
    </View>
  </ScrollView>
)
