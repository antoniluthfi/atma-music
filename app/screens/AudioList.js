import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import { Audio } from "expo-av";

// component
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { play, pause, resume } from "../misc/audioController";

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);

    this.state = {
      optionModalVisible: false,
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudio = async (audio) => {
    // playing audio for the first time
    if (!this.state.soundObj) {
      const playback = new Audio.Sound();
      // const status = await playback.loadAsync(
      //   { uri: audio.uri },
      //   { shouldPlay: true }
      // );
      const status = await play(playback, audio.uri);

      return this.setState({
        ...this.state,
        currentAudio: audio,
        playbackObj: playback,
        soundObj: status,
      });
    }

    // pause audio
    if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
      const status = await pause(this.state.playbackObj);

      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }

    // resume audio
    if (
      this.state.soundObj.isLoaded &&
      !this.state.soundObj.isPlaying &&
      this.state.currentAudio.id === audio.id
    ) {
      const status = await resume(this.state.playbackObj);

      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }
  };

  rowRenderer = (type, item) => {
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
        onAudioPlay={() => this.handleAudio(item)}
      />
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />

              <OptionModal
                currentItem={this.currentItem}
                visible={this.state.optionModalVisible}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                onPlay={() => console.log("tes")}
                onAddToPlayList={() => console.log("playlist")}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
