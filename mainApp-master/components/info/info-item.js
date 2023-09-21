import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Paho from "paho-mqtt";

const client = new Paho.Client("broker.hivemq.com", Number(8000), `clientID`);

const InfoItem = ({ image, temp, light, pH, ec }) => {
  const [value, setValue] = useState(temp);
  const [state, setState] = useState("On");
  const [yellow, setYellow] = useState("On");
  const [color, setColor] = useState("Red");
  const [white, setWhite] = useState("On");

  const [air, setAir] = useState("On");
  /*   const [xkc, setSome] = useEffect("Good");
   */
  const [some, setSome] = useState("Good");
  function onMessage(message) {
    if (message.destinationName === "mqtt-async-test/value")
      setValue(parseInt(message.payloadString));
  }

  function onStateMessage(message) {
    if (message.destinationName === "mqtt-async-test/state") {
      setState(message.payloadString);
    }
  }

  function onWhiteMessage(message) {
    if (message.destinationName === "mqtt-async-test/white") {
      setWhite(message.payloadString);
    }
  }

  function onColorMessage(message) {
    if (message.destinationName === "mqtt-async-test/color") {
      setColor(message.payloadString);
    }
  }

  function onColorYellowMessage(message) {
    if (message.destinationName === "mqtt-async-test/yellow") {
      setYellow(message.payloadString);
    }
  }

  function onAirMessage(message) {
    if (message.destinationName === "mqtt-async-test/air") {
      setAir(message.payloadString);
    }
  }

  function onSomeMessage(message) {
    if (message.destinationName === "mqtt-async-test/xkc") {
      setSome(message.payloadString);
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("mqtt-async-test/value");
        client.subscribe("mqtt-async-test/color");
        client.subscribe("mqtt-async-test/state");
        client.subscribe("mqtt-async-test/air");
        client.subscribe("mqtt-async-test/xkc");
        client.subscribe("mqtt-async-test/yellow");
        client.subscribe("mqtt-async-test/white");
        client.onMessageArrived = (message) => {
          onMessage(message);
          onColorMessage(message);
          onStateMessage(message);
          onAirMessage(message);
          onSomeMessage(message);
          onColorYellowMessage(message);
          onWhiteMessage(message);
        };
      },
      onFailure: (error) => {
        console.log("Failed to connect! ", error.errorMessage);
      },
    });
  }, []);

  function toggleState() {
    const newState = state === "On" ? "Off" : "On";
    const message = new Paho.Message(newState);
    message.destinationName = "mqtt-async-test/state";
    client.send(message);
  }

  function toggleYellow() {
    const newYellow = yellow === "On" ? "Off" : "On";
    const message = new Paho.Message(newYellow);
    message.destinationName = "mqtt-async-test/yellow";
    client.send(message);
  }

  function toggleWhite() {
    const newWhite = white === "On" ? "Off" : "On";
    const message = new Paho.Message(newWhite);
    message.destinationName = "mqtt-async-test/white";
    client.send(message);
  }

  function toggleAir() {
    const newAir = air === "On" ? "Off" : "On";
    const message = new Paho.Message(newAir);
    message.destinationName = "mqtt-async-test/air";
    client.send(message);
  }

  function toggleSome() {
    const newSome = some === "Good" ? "Warn" : "Good";
    const message = new Paho.Message(newSome);
    message.destinationName = "mqtt-async-test/xkc";
    client.send(message);
  }

  function changeColor() {
    let newColor = "Red";
    switch (color) {
      case "Red":
        newColor = "Blue";
        break;
      case "Blue":
        newColor = "Green";
        break;
      case "Green":
        newColor = "Red";
        break;
      default:
        newColor = "Red";
    }

    const message = new Paho.Message(newColor);
    message.destinationName = "mqtt-async-test/color";
    client.send(message);
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "space-around" }}>
      <View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://en.wikipedia.org/wiki/Spinach")
          }
        >
          <Image source={image} style={{ width: 200, height: 200 }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <View>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/temperature.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{value}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/humidity.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{light}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleAir}>
            <Image
              source={require("../../assets/airpump.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{air}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/ph.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{pH}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleState}>
            <Image
              source={require("../../assets/water-pump.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{state}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleYellow}>
            <Image
              source={require("../../assets/image/led.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{yellow}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../assets/biomass-energy.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{ec}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleWhite}>
            <Image
              source={require("../../assets/led.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{white}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleSome}>
            <Image
              source={require("../../assets/XKC.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text>{some}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 20,
    padding: 30,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default InfoItem;
