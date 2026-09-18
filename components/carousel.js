import { useState } from 'react';
import { FlatList, Image, Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../constants/theme';
import { PRIVACY_URL, TERMS_URL } from '../constants/links';
import { getTranslations } from '../state/translations';
import { useLanguage } from '../state/language-context';

const IMAGE_WIDTH_SCALE = 0.78;
const SHEET_HEIGHT = 276;
const SHEET_OVERLAP = 24;

function getSlides(t) {
  return [
    { key: '1', title: t.slide1Title, body: t.slide1Body, image: require('../assets/01.png'), ratio: 870 / 1560 },
    { key: '2', title: t.slide2Title, body: t.slide2Body, image: require('../assets/02.png'), ratio: 870 / 1560 },
    { key: '3', title: t.slide3Title, body: t.slide3Body, image: require('../assets/03.png'), ratio: 870 / 1529 },
    { key: '4', title: t.slide4Title, body: t.slide4Body, image: require('../assets/04.png'), ratio: 882 / 882, scale: 1.08 },
  ];
}

export default function Carousel({ onFinish }) {
  const { width, height } = useWindowDimensions();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [index, setIndex] = useState(0);
  const updateIndex = (event) => setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  const slides = getSlides(t);
  const stageHeight = height - SHEET_HEIGHT + SHEET_OVERLAP;

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[colors.accent, '#003d12']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stage}
      >
        <FlatList
          key={`carousel-${width}`}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={updateIndex}
          onMomentumScrollEnd={updateIndex}
          scrollEventThrottle={16}
          keyExtractor={(item) => item.key}
          getItemLayout={(_, itemIndex) => ({
            length: width,
            offset: width * itemIndex,
            index: itemIndex,
          })}
          renderItem={({ item }) => (
            <CarouselSlide slide={item} width={width} stageHeight={stageHeight} />
          )}
        />
      </LinearGradient>
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>{slides[index].title}</Text>
        <Text style={styles.sheetBody}>{slides[index].body}</Text>
        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <View key={slide.key} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <Pressable style={styles.sheetButton} onPress={onFinish}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? gradients.primaryPressed : gradients.primary}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.sheetButtonSurface}
            >
              <Text style={styles.sheetButtonText}>{t.start}</Text>
            </LinearGradient>
          )}
        </Pressable>
        <View style={styles.legalLinks}>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL(PRIVACY_URL)}>
            <Text style={styles.legalLink}>{t.privacy}</Text>
          </Pressable>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL(TERMS_URL)}>
            <Text style={styles.legalLink}>{t.terms}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function CarouselSlide({ slide, width, stageHeight }) {
  const slideWidth = Math.min(width * (slide.scale ?? IMAGE_WIDTH_SCALE), (stageHeight - 70) * slide.ratio);
  const slideHeight = slideWidth / slide.ratio;
  return (
    <View style={[styles.page, { width }]}>
      <Image
        source={slide.image}
        style={{ width: slideWidth, height: slideHeight, marginTop: 50 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, minHeight: 0, overflow: 'hidden', backgroundColor: colors.bg },
  stage: { flex: 1, minHeight: 0, overflow: 'hidden' },
  page: { alignItems: 'center', justifyContent: 'center' },
  sheet: {
    minHeight: SHEET_HEIGHT,
    backgroundColor: '#000',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -SHEET_OVERLAP,
    zIndex: 1,
    elevation: 1,
    paddingHorizontal: 34,
    paddingTop: 38,
    paddingBottom: 8,
    overflow: 'hidden',
  },
  sheetTitle: { color: '#fff', fontSize: 27, lineHeight: 32, fontWeight: '800', textAlign: 'center' },
  sheetBody: { color: '#c8c8c8', fontSize: 14, lineHeight: 19, textAlign: 'center', marginTop: 14, minHeight: 38 },
  dots: { alignSelf: 'center', flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#536127' },
  dotActive: { width: 13, height: 13, borderRadius: 7, marginTop: -3, backgroundColor: colors.accent },
  sheetButton: { minHeight: 57, borderRadius: 29, overflow: 'hidden' },
  sheetButtonSurface: {
    minHeight: 57,
    paddingHorizontal: 24,
    borderRadius: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetButtonText: { color: colors.ink, fontSize: 17, lineHeight: 22, fontWeight: '800' },
  legalLinks: { marginTop: 16, flexDirection: 'row', justifyContent: 'center', gap: 24 },
  legalLink: { color: colors.accent, textDecorationLine: 'underline', fontSize: 13, lineHeight: 16, fontWeight: '600' },
});
