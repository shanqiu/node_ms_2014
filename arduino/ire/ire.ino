//EX. with button and Pot input

const int ledPin = 13;

int lightPin01=3;
int sensorLight01=0;
int prevLightVal01=0;

int lightoutPin01=3;
int buttonoutPin01=5;

int lightoutPin02=6;
int buttonoutPin02=9;

int lightPin02=2;
int sensorLight02=0;
int prevLightVal02=0;

int potPin01 = 4;
int sensorVal01 = 0;
int prevVal01 = 0;

int potPin02 = 0;
int sensorVal02 = 0;
int prevVal02 = 0;

String inputString = "";

//button variables
int buttonPin01=7;
int buttonState01=0; //var for reading the button statis, this changes
int prevButton01=0;

int buttonPin02=10;
int buttonState02=0; //var for reading the button statis, this changes
int prevButton02=0;


void setup()
{
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  pinMode(lightoutPin01,OUTPUT);
  pinMode(lightoutPin02,OUTPUT);
  pinMode(buttonoutPin01,OUTPUT);
  pinMode(buttonoutPin02,OUTPUT);
   pinMode(buttonPin01,INPUT);
  pinMode(buttonPin02,INPUT);
}
 
void loop()
{
 
 
 if(Serial.available()>0){
   int incomingByte=Serial.read();
   
   if(incomingByte==1){
     digitalWrite(ledPin,1);
   }else if(incomingByte==0){
      digitalWrite(ledPin,0);
   }
 
 }
 

 sensorLight01=analogRead(lightPin01);
 if(prevLightVal01!=sensorLight01){
  Serial.print('A');
   Serial.print(sensorLight01);
    Serial.print('B');
    prevLightVal01=sensorLight01;
 
}

 sensorLight02=analogRead(lightPin02);
 if(prevLightVal02!=sensorLight02){
  Serial.print('C');
   Serial.print(sensorLight02);
    Serial.print('D');
    prevLightVal02=sensorLight02;
 
}
 
 
 sensorVal01=analogRead(potPin01);



  sensorVal02=analogRead(potPin02); 


buttonState01=digitalRead(buttonPin01);
if(buttonState01==1){
digitalWrite(buttonoutPin02,HIGH);
}else{
digitalWrite(buttonoutPin02,LOW);
}
Serial.print('I');
Serial.print(buttonState01);
Serial.print('J');

buttonState02=digitalRead(buttonPin02);
if(buttonState02==1){
digitalWrite(buttonoutPin01,HIGH);
}else{
digitalWrite(buttonoutPin01,LOW);
}
Serial.print('K');
Serial.print(buttonState02);
Serial.print('U');
analogWrite(lightoutPin01,sensorVal02/5);
analogWrite(lightoutPin02,sensorVal01/5); 


delay(500);
  
}
