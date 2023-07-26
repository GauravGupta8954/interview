import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from './Scale';
import { Avatar } from 'react-native-paper';
import moment from "moment";
export default function App() {


  const [data, setData] = useState([])
  useEffect(() => {
    callApi()
  }, [])
  const callApi = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {

        's-id': 'CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y',
      },
    };
    //console.log('andar ka maal', token);
    try {
      const response = await fetch(
        'https://stagingsite.livelaw.in/dev/h-api/news',
        requestOptions,
      );

      //console.log(" response ", JSON.stringify(response));

      const json = await response.json();
      console.log("data", json.news[0].mediaId);
      setData(json.news)

    } catch (error) {
      console.log(error);
     

    } finally {
      
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ flex: 1 }}>
        <FlatList

          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ borderWidth: 1, borderRadius: moderateScale(10), margin: 10, height: verticalScale(380) }}>
                {/* image container */}
                <View style={{ height: verticalScale(270), marginVertical: verticalScale(8), position: 'relative' }}>
                  <Image
                    source={{ uri: item.mediaId ? item.mediaId : 'https://stagingsite.livelaw.in/h-upload/videothumb/yt_vJefOB8kec8.jpg' }}
                    style={{ height: '100%', width: '96%', alignSelf: 'center', borderRadius: moderateScale(10) }}
                  />
                  <View style={styles.textOverlay}>
                    <Text style={styles.overlayText}>India</Text>
                  </View>
                </View>


                {/* description */}
                {
                  item.description ? <Text style={{
                    color: 'black', fontSize: moderateScale(20), marginHorizontal: '2%',
                  }}>{item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}</Text>
                    : <Text style={{ color: 'black', fontSize: moderateScale(20), marginHorizontal: '2%' }}>
                      The most dangerous bakugan in the world is here.</Text>
                }


                {/* name and time container */}
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '1%', marginHorizontal: '2%', }}>
                    <View style={{ flexDirection: 'row', }}>
                      <Avatar.Image size={moderateScale(28)} source={{ uri: 'https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent-Picture.png' }} />
                      <View style={{ justifyContent: 'center' }}>
                        {
                          item.authorName ? <Text style={{ color: 'black', fontSize: moderateScale(14), marginHorizontal: scale(5), }}>{item.authorName}</Text>
                            : <Text style={{ color: 'black', fontSize: moderateScale(14), marginHorizontal: scale(5) }}>Hocalwire</Text>
                        }
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Avatar.Image size={moderateScale(28)} source={{ uri: 'https://w7.pngwing.com/pngs/149/532/png-transparent-social-media-avatar-ico-icon-cartoon-clock-cartoon-character-angle-cartoons.png' }} />
                      <View style={{ justifyContent: 'center' }}>
                        {item.date_news ?
                          <Text style={{ color: 'black', fontSize: moderateScale(14), marginHorizontal: scale(5), }}>{moment(item.date_news).fromNow()}</Text>
                          : <Text style={{ color: 'black', fontSize: moderateScale(14), marginHorizontal: scale(5), }}>2 hrs ago</Text>}
                      </View>
                    </View>
                  </View>
                </View>
              </View>)
          }}
        />

      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  textOverlay: {
    position: 'absolute', // This will position the text over the image
    top: verticalScale(20),
    left: '2%',
    right: 0,
    backgroundColor: 'darkyellow', 
    padding: '2%',
    width: scale(70),
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5)
  },
  overlayText: {
    color: 'black', 
    fontSize: moderateScale(18), 
    textAlign: 'center',
  },
})