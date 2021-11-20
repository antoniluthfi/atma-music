import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import color from "../misc/color";

const OptionModal = ({
  visible,
  currentItem,
  onClose,
  onPlay,
  onAddToPlayList,
}) => {
  const { filename } = currentItem;

  return (
    <>
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.modal}>
          <Text numberOfLines={2} style={styles.title}>
            {filename}
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableWithoutFeedback onPress={onPlay}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onAddToPlayList}>
              <Text style={styles.option}>Add to playlist</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  optionsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: color.MODAL_BG,
  },
});
