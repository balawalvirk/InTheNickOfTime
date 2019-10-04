import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Text, Image } from "react-native";
import { ViewPager } from "rn-viewpager";

import StepIndicator from "react-native-step-indicator";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import colors from "../../Themes/Colors";

// New Screens
import Intro from "./Intro";
import Story from "./Story";
import Idea from "./Idea";
import Working from "./Working";
import Data from "./Data";
import Services from "./Services";
import Agreement from "./Agreement";
import Finish from "./Finish";


const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: colors.SPA_redColor,
  stepStrokeWidth: 1,
  separatorStrokeFinishedWidth: 1,
  stepStrokeFinishedColor: colors.SPA_redColor,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: colors.SPA_redColor,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: colors.SPA_redColor,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 5,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor:  colors.SPA_redColor,
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor:  colors.SPA_redColor
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" :  colors.SPA_redColor,
    size: 10
  };
  switch (position) {
    case 0: {
      iconConfig.name = "email";
      break;
    }
    case 1: {
      iconConfig.name = "accessibility";
      break;
    }
    case 2: {
      iconConfig.name = "play-arrow";
      break;
    }
    case 3: {
      iconConfig.name = "assignment-ind";
      break;
    }
    case 4: {
      iconConfig.name = "favorite";
      break;
    }
    case 5: {
        iconConfig.name = "play-arrow";
        break;
      }
      case 6: {
        iconConfig.name = "accessibility";
        break;
      }
      case 7: {
        iconConfig.name = "favorite";
        break;
      }
    default: {
      break;
    }
  }
  return iconConfig;
};

PAGES = []

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      nextPage: 1
    };
  }


  componentWillMount(){


    PAGES = [
      <Intro
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });
        
        }}
      ></Intro>,
      <Story
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });

        }}
      ></Story>,
      <Idea
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });

        }}
      ></Idea>,
      <Working
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });

        }}
      ></Working>,
      <Data
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });
        }}
      ></Data>,
      <Services
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });
        }}
      ></Services>,
      <Agreement
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.viewPager.setPage(this.state.nextPage);
          this.setState({ nextPage: this.state.nextPage + 1 });
        }}
      ></Agreement>,
      <Finish
        
        location = {this.props.navigation.state.params.location}
        selectedData={() => {
          this.props.navigation.navigate("login");
        }}
      ></Finish>
    ];  }
    
  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.currentPage != this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
          
        <View style={styles.stepIndicator}>
          <StepIndicator
            renderStepIndicator={this.renderStepIndicator}
            customStyles={secondIndicatorStyles}
            currentPosition={this.state.currentPage}
            labels={[
              "Intro",
              "Story",
              "Idea",
              "Working",
              "Info",
              "Services",
              "Agreement",
              "Finish",


            ]}
          />
        </View>
       
        <ViewPager
          style={{ flexGrow: 1 }}
          ref={viewPager => {
            this.viewPager = viewPager;
          }}
          onPageSelected={page => {
            this.setState({ currentPage: page.position });
          }}
          horizontalScroll={false}
        >
          {PAGES.map(page => this.renderViewPagerPage(page))}
        </ViewPager>
      </View>
    );
  }

  onStepPress = position => {
    this.setState({ currentPage: position });
    this.viewPager.setPage(position);
  };

  renderViewPagerPage = data => {
    return data;
  };

  renderStepIndicator = params => (
    
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );

  renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  stepIndicator: {
    marginTop: 10,
    marginBottom : 25,
    marginHorizontal: 10
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#999999"
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#4aae4f"
  }
});
