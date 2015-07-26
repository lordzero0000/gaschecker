#include <SPI.h>
#include <Ethernet.h>

const int buttonPin = 2;
const int ledPin =  13;
int buttonState = LOW;
int ContadorLitros = 0;


//Ethernet
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char server[] = "www.google.com";
//char server[] = "reto-fiware-cp15.herokuapp.com";
//"https://reto-fiware-cp15.herokuapp.com/api/postLiters?liters";
IPAddress ip(192, 168, 0, 177);
EthernetClient client;

void setup() {
  // Open serial communications and wait for port to open:
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);

  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("connecting...");

  // if you get a connection, report back via serial:
  if (client.connect(server, 80)) {
    Serial.println("connected");
    // Make a HTTP request:
    client.println("GET /search?q=arduino HTTP/1.1");
    ///api/postLiters?liters
    //client.println("GET /api/postLiters?liters");
    //client.println("Host: reto-fiware-cp15.herokuapp.com");
    client.println("Host: www.google.com");
    client.println("Connection: close");
    client.println();
  }
  else {
    // kf you didn't get a connection to the server:
    Serial.println("connection failed");
  }

}

void loop() {

 buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println("Abierto");
    ContarLitros();
  }
  else {
    digitalWrite(ledPin, LOW);
     Serial.println("Cerrado");
  }
}



void ContarLitros(){
 int tiempo = millis ();
  while(digitalRead(buttonPin)){
     Serial.println("Llenando");
     if(digitalRead(buttonPin))
     ContadorLitros+=1;
  }
  tiempo = millis () - tiempo;
  ContadorLitros = tiempo/1000;
  Serial.println(ContadorLitros);
  Serial.println("Termine");
  SendRequest();
}


void SendRequest(){
  if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    while (true);
  }
}
