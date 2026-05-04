import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {

const activities = [
  {
    title: 'EARTHQUAKE\nRESISTANT\nSTRUCTURE',
    icon: require('../../assets/images/building.png'),
    tag: 'Engineering',
    iconStyle: { width: 29, height: 30 }
  },
  {
    title: 'PARACHUTE\nDROP\nCHALLENGE',
    icon: require('../../assets/images/parachute.png'),
    tag: 'Science',
    iconStyle: { width: 30, height: 30 }
  },
  {
    title: 'REACTION\nBOARD\nLAB',
    icon: require('../../assets/images/lightning.png'),
    tag: 'Science',
    iconStyle: { width: 28, height: 28 }
  },
  {
    title: 'HUMAN\nPERFORMANCE\nLAB',
    icon: require('../../assets/images/human.png'),
    tag: 'Science',
    iconStyle: { width: 33, height: 33 }
  },
  {
    title: 'HAND\nFAN\nCHALLENGE',
    icon: require('../../assets/images/fan.png'),
    tag: 'Engineering',
    iconStyle: { width: 40, height: 29 }
  },
  {
    title: 'SOUND\nPOLLUTION\nHUNTER',
    icon: require('../../assets/images/sound.png'),
    tag: 'Science',
    iconStyle: { width: 30, height: 30 }
  },
];

  return (
    <ImageBackground
      source={require('../../assets/images/space.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/menu.png')} style={styles.icon} />
          <Text style={styles.logo}>STEMM LAB</Text>
          <Image source={require('../../assets/images/user1.png')} style={styles.icon} />
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            WELCOME BACK VALENCIA
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.section}>AVAILABLE ACTIVITIES</Text>

        {/* GRID */}
        <View style={styles.grid}>
          {activities.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.85} style={styles.cardWrapper}>
              <View style={styles.card}>

                {/* TOP ROW */}
                <View style={styles.cardRow}>
                  <Image
                    source={item.icon}
                    style={[styles.cardIcon, item.iconStyle]}
                  />
                  <Text style={styles.cardText}>{item.title}</Text>
                </View>

                {/* TAG */}
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>

              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA (PASTEL YELLOW) */}
        <View style={styles.cta}>
          <Image source={require('../../assets/images/trophy.png')} style={styles.ctaIcon} />
          <View>
            <Text style={styles.ctaTitle}>KEEP EXPLORING!</Text>
            <Text style={styles.ctaText}>
              Complete activities, earn badges and level up your team!
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <NavItem
          icon={require('../../assets/images/home1.png')}
          label="HOME"
          active
          imageStyle={styles.homeIcon}
        />
        <NavItem
          icon={require('../../assets/images/rocket.png')}
          label="ACTIVITIES"
          imageStyle={styles.rocketIcon}
        />
        <NavItem
          icon={require('../../assets/images/leaderboard.png')}
          label="LEADERBOARD"
          imageStyle={styles.leaderboardIcon}
        />
      </View>

    </ImageBackground>
  );
}

const NavItem = ({ icon, label, active = false, imageStyle }: any) => (
  <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
    
    <Image
      source={icon}
      style={[styles.navImage, imageStyle]}
      resizeMode="contain"
    />

    <Text style={[styles.navText, active && styles.activeText]}>
      {label}
    </Text>

    {active && <View style={styles.activeLine} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },

  icon: {
    width: 28,
    height: 28,
    tintColor: '#fff'
  },

  logo: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 22,
  },

  welcomeCard: {
    marginTop: 20,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(109,40,217,0.8)',
  },

  welcomeText: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 14,
    textAlign: 'center'
  },

  activeLine: {
    marginTop: 7,
    width: 40,
    height: 2,
    backgroundColor: '#FACC15',
  },

  section: {
    marginTop: 20,
    color: '#9CA3AF',
    fontFamily: 'Pixel',
    fontSize: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cardWrapper: {
    width: '48%',
    marginBottom: 14,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  cardIcon: {
    marginRight: 10,
    marginTop: 4,
  },

  cardText: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 11,
    flex: 1,
    lineHeight: 18,
  },

  tag: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'rgba(250,204,21,0.2)',
    borderWidth: 1,
    borderColor: '#FACC15',
  },

  tagText: {
    color: '#FACC15',
    fontSize: 10,
    fontFamily: 'Pixel',
  },

  card: {
    backgroundColor: 'rgba(30,41,59,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    padding: 16,
    height: 130,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  cta: {
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
backgroundColor: 'rgba(254, 243, 199, 0.8)',
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: '#FACC15',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  ctaIcon: {
    width: 50,
    height: 45,
    marginRight: 12,
  },

  ctaTitle: {
    fontFamily: 'Pixel',
    fontSize: 14,
    color: '#000'
  },

  ctaText: {
    fontSize: 10,
    color: '#000',
    fontFamily:'pixeljosh6',
    marginTop:4,
  },

  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(2,6,23,0.95)',
  },

  navItem: {
    alignItems: 'center',
  },

  navImage: {
    marginBottom: 4,
  },

  navText: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Pixel'
  },

  activeText: {
    color: '#FACC15',
    textShadowColor: '#FACC15',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },

  homeIcon: { width: 34, height: 34 },
  rocketIcon: { width: 34, height: 34 },
  leaderboardIcon: { width: 34, height: 34 },
});