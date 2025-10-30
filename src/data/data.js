export const CATALOG_VERSION = '2025-02-27';

// Production dataset for catalog listings
export const projects = [
  
  {
    id: 'PECEM0101',
    title: 'Authentication of Helmet & Alcohol Sensing for Rider’s Safety using Arduino UNO',
    description: 'A safety-based embedded system that ensures vehicle ignition only when the rider is wearing a helmet and is not under the influence of alcohol. The system employs an MQ-3 alcohol sensor and helmet detection module interfaced with Arduino UNO to enhance rider safety.',
    category: 'EEE',
    price: 1999,
    tags: ['Arduino', 'Safety', 'MQ3', 'Embedded', 'Helmet Detection'],
    features: [
      'Arduino UNO-based control system',
      'MQ-3 alcohol detection sensor',
      'Helmet authentication using IR/pressure sensor',
      'Relay module for ignition control',
      'Buzzer alert for unsafe conditions',
      '16x2 I2C LCD display for real-time monitoring'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0202',
    title: 'Wireless Health Monitoring System Based on Android',
    description: 'A wireless health monitoring system that continuously tracks patient parameters like temperature, pulse, and heart rate, transmitting them via Bluetooth to an Android application for real-time monitoring and alerts.',
    category: 'EEE',
    price: 2299,
    tags: ['Arduino', 'Health', 'Bluetooth', 'Android', 'Wireless'],
    features: [
      'Arduino UNO microcontroller',
      'Temperature and heartbeat sensors',
      'Bluetooth communication with Android app',
      'Android interface for live monitoring',
      'Buzzer alert for abnormal readings',
      'Rechargeable power supply integration'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0303',
    title: 'Advanced Embedded Automatic Car Parking System',
    description: 'An automated parking system that detects available parking slots using ultrasonic sensors and guides vehicles into them with LED indicators. The system is controlled by Arduino for intelligent space management.',
    category: 'EEE',
    price: 2399,
    tags: ['Arduino', 'Automation', 'Ultrasonic', 'Parking', 'Sensors'],
    features: [
      'Ultrasonic sensors for slot detection',
      'Arduino-based decision system',
      'LED indicators for parking availability',
      'LCD display for slot status',
      'Automatic gate control mechanism',
      'Low power consumption system design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0404',
    title: 'Automated Energy Saving and Safety System Using ESP32 and IoT',
    description: 'An ESP32-based automation system that manages lighting and electrical devices based on human presence and ambient light levels. It also detects fire or gas leakage and sends real-time alerts via IoT.',
    category: 'EEE',
    price: 2499,
    tags: ['ESP32', 'IoT', 'Automation', 'Energy Saving', 'Safety'],
    features: [
      'ESP32 microcontroller with Wi-Fi connectivity',
      'PIR and LDR sensors for automation',
      'MQ-2 gas sensor for safety detection',
      'IoT-based control through Blynk app',
      'Real-time alert and monitoring system',
      'Compact and efficient design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0505',
    title: 'Automatic Brake Failure and Engine Overheating Indication System using ESP32',
    description: 'A vehicle safety system that continuously monitors brake condition and engine temperature using ESP32. It provides real-time alerts through buzzer, LEDs, and an LCD display when unsafe conditions are detected.',
    category: 'EEE',
    price: 2399,
    tags: ['ESP32', 'Automotive', 'Safety', 'Temperature', 'Sensors'],
    features: [
      'Brake failure detection module',
      'Engine temperature monitoring sensor',
      'ESP32 microcontroller for processing',
      'LCD and LED-based alert system',
      'Buzzer alarm for critical warnings',
      'Low-cost safety enhancement system'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0606',
    title: 'SMS Based Home Security System using Arduino UNO and GSM Module',
    description: 'An Arduino-based home security system that detects motion, gas leaks, and fire, sending instant SMS alerts via GSM module. It also provides buzzer alarms and real-time status on an LCD display.',
    category: 'EEE',
    price: 2299,
    tags: ['Arduino', 'GSM', 'Security', 'Home Automation', 'Sensors'],
    features: [
      'PIR, MQ-2, and flame sensors for detection',
      'GSM module for SMS notifications',
      'LCD display for live system status',
      'Buzzer alert for immediate warnings',
      'Low-cost home protection solution',
      'Easy installation and expansion support'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0707',
    title: 'Accelerometer-Based Transportation Monitoring System Using ESP32, GSM, and GPS',
    description: 'A smart transportation monitoring system that detects abnormal vehicle motion using an accelerometer. On detecting collisions, the system sends the GPS location to registered contacts through GSM communication.',
    category: 'EEE',
    price: 2599,
    tags: ['ESP32', 'GPS', 'GSM', 'Accelerometer', 'Safety'],
    features: [
      '3-axis accelerometer for motion detection',
      'GPS module for location tracking',
      'GSM module for SMS alerts',
      'ESP32 microcontroller integration',
      'LCD display for live updates',
      'Emergency notification mechanism'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0808',
    title: 'Embedded System for Home Automation using SMS',
    description: 'A GSM-based embedded system that allows users to control and monitor home appliances via SMS commands. It ensures easy automation even without internet connectivity.',
    category: 'EEE',
    price: 2199,
    tags: ['GSM', 'Home Automation', 'Embedded', 'SMS', 'Control'],
    features: [
      'GSM900 module for SMS-based control',
      'Relay modules for appliance switching',
      'Arduino microcontroller-based design',
      'Low power consumption',
      'Secure command verification system',
      'LCD display for status updates'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM0909',
    title: 'Energy-Saving System for Classroom Based on Campus Card',
    description: 'A smart energy-saving embedded system that activates or deactivates classroom lights and fans based on student ID card authentication using RFID technology.',
    category: 'EEE',
    price: 2499,
    tags: ['RFID', 'Energy Saving', 'Automation', 'Arduino', 'Smart Campus'],
    features: [
      'RFID reader for card-based authentication',
      'Relay module for electrical control',
      'Arduino UNO microcontroller',
      'Energy-efficient automation design',
      'LCD interface for room status display',
      'Automatic shutoff for idle conditions'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1010',
    title: 'Fingerprint Based Identity Authentication for Examination System',
    description: 'An identity verification system using fingerprint authentication to ensure only authorized students can appear for exams. The system enhances security and prevents impersonation.',
    category: 'EEE',
    price: 2699,
    tags: ['Fingerprint', 'Security', 'Arduino', 'Authentication', 'Biometric'],
    features: [
      'Fingerprint sensor module integration',
      'Arduino UNO-based processing',
      'LCD display for identity verification',
      'Buzzer for authentication feedback',
      'Student data registration system',
      'Secure and efficient identity check'
    ],
    image: '/images/eee.png',
    
  },

  {
    id: 'PECEM1111',
    title: 'Fingerprint Based Access Control System',
    description: 'An advanced access control system using fingerprint authentication to allow only authorized individuals to enter secured areas. The system enhances physical security in offices and laboratories.',
    category: 'EEE',
    price: 2599,
    tags: ['Fingerprint', 'Access Control', 'Security', 'Arduino', 'Biometric'],
    features: [
      'Fingerprint sensor for authentication',
      'Arduino UNO microcontroller',
      'Relay-controlled door locking mechanism',
      'LCD display for user feedback',
      'Buzzer alert for unauthorized access',
      'EEPROM-based data storage'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1212',
    title: 'Friendly Assistive System for Home Automation and Talking Prototype',
    description: 'A voice-assisted home automation system that controls household devices through voice commands, providing special assistance to elderly or differently-abled individuals.',
    category: 'EEE',
    price: 2799,
    tags: ['Voice Control', 'Home Automation', 'Assistive', 'Arduino', 'IoT'],
    features: [
      'Voice command recognition system',
      'Arduino UNO-based control circuit',
      'Appliance control via relays',
      'LCD status display',
      'Buzzer for audio feedback',
      'User-friendly interface for disabled users'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1313',
    title: 'GSM Based Management System for Remote Access of Home Terminals',
    description: 'A GSM-enabled embedded system allowing users to remotely manage and control home appliances through SMS commands, ensuring comfort and energy efficiency.',
    category: 'EEE',
    price: 2299,
    tags: ['GSM', 'Home Automation', 'Remote Control', 'Arduino', 'SMS'],
    features: [
      'GSM module integration for SMS control',
      'Relay-based appliance switching',
      'Arduino microcontroller unit',
      'Real-time SMS acknowledgment system',
      'Low-cost and easy-to-install setup',
      'Power-efficient design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1414',
    title: 'Hybrid Driver Safety, Vigilance, and Security System for Vehicle',
    description: 'A smart vehicle system that monitors driver alertness, detects drowsiness, and enhances safety through vibration and buzzer warnings. It integrates sensors for vigilance and collision prevention.',
    category: 'EEE',
    price: 2799,
    tags: ['Driver Safety', 'Vigilance', 'Vehicle', 'Sensors', 'ESP32'],
    features: [
      'Eye blink and alcohol sensors',
      'Vibration motor for drowsiness alert',
      'Buzzer and LED for safety indication',
      'ESP32 controller for smart processing',
      'LCD for driver status display',
      'Compact and reliable system design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1515',
    title: 'Wireless-Based Automatic Irrigation System for Agriculture Using Sensors',
    description: 'An intelligent irrigation system that uses soil moisture and humidity sensors to automatically water crops when needed, helping farmers save water and increase efficiency.',
    category: 'EEE',
    price: 2499,
    tags: ['Agriculture', 'Automation', 'Irrigation', 'Wireless', 'Sensors'],
    features: [
      'Soil moisture and humidity sensing',
      'Wireless control module for data transfer',
      'Automatic motor control for irrigation',
      'LCD display for live soil status',
      'Power-efficient embedded design',
      'Arduino UNO-based control system'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1616',
    title: 'Wireless Sensor Network Application for Indoor Intrusion Detection',
    description: 'A security system based on wireless sensor networks that detects unauthorized movements inside restricted areas using multiple PIR sensors and transceivers.',
    category: 'EEE',
    price: 2599,
    tags: ['Wireless', 'Security', 'Sensor Network', 'Intrusion', 'Automation'],
    features: [
      'PIR sensors for motion detection',
      'Wireless transceiver communication',
      'Central control unit for data processing',
      'Buzzer and light alert for intrusion',
      'Low-cost and efficient design',
      'Expandable architecture for large areas'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1717',
    title: 'Water Level Indicator',
    description: 'A simple and effective water level indication system that alerts users when the tank is full or empty, preventing water wastage and dry running of pumps.',
    category: 'EEE',
    price: 1499,
    tags: ['Water Level', 'Indicator', 'Arduino', 'Automation', 'Sensors'],
    features: [
      'Water level sensing using float/sensor probes',
      'LED and buzzer level indicators',
      'Relay-based motor control',
      'Low-cost Arduino system',
      'Compact and efficient circuit design',
      'Suitable for domestic and industrial tanks'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1818',
    title: 'Temperature Monitoring of Conductors Based on GSM-SMS',
    description: 'A temperature monitoring system for electrical conductors that transmits temperature data via GSM SMS alerts, ensuring early detection of overheating risks.',
    category: 'EEE',
    price: 2399,
    tags: ['Temperature', 'GSM', 'Monitoring', 'SMS', 'Arduino'],
    features: [
      'Temperature sensor for conductor monitoring',
      'Arduino-based control and data processing',
      'GSM module for SMS transmission',
      'LCD display for temperature values',
      'Buzzer for overheat warning',
      'Industrial-grade reliability'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM1919',
    title: 'Student Administration Automation System',
    description: 'An embedded-based automation system that simplifies student data management, attendance recording, and report generation, reducing manual work in institutions.',
    category: 'EEE',
    price: 2699,
    tags: ['Automation', 'Student Management', 'Embedded', 'Data Logging', 'System'],
    features: [
      'Microcontroller-based control unit',
      'Data storage and display module',
      'Attendance and record management',
      'User-friendly LCD interface',
      'Customizable design for institutions',
      'Efficient data handling'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2020',
    title: 'Vehicle Accident Avoidance System',
    description: 'A vehicle safety system that uses ultrasonic sensors to detect nearby obstacles and alert the driver to avoid collisions. It ensures safer driving, especially in low visibility conditions.',
    category: 'EEE',
    price: 2599,
    tags: ['Automotive', 'Safety', 'Ultrasonic', 'Accident Avoidance', 'Embedded'],
    features: [
      'Ultrasonic obstacle detection sensors',
      'Arduino-based vehicle control logic',
      'Buzzer and LED alerts for driver warning',
      'LCD display for obstacle distance',
      'Low-latency response system',
      'Compact and reliable circuit design'
    ],
    image: '/images/eee.png',
    
  },

  {
    id: 'PECEM2121',
    title: 'Secured Electronic Voting Machine Using Biometric',
    description: 'A biometric-based electronic voting system that ensures one-person-one-vote authentication using fingerprint recognition technology. It enhances election transparency and prevents fraudulent voting.',
    category: 'EEE',
    price: 2799,
    tags: ['Biometric', 'Voting Machine', 'Fingerprint', 'Security', 'Embedded'],
    features: [
      'Fingerprint module for voter authentication',
      'Microcontroller-based control circuit',
      'LCD display for voting status',
      'Relay-controlled vote casting mechanism',
      'Data storage and verification system',
      'Tamper-proof hardware design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2222',
    title: 'Optical Device Indicating a Safe Free Path for Blind People',
    description: 'A wearable optical device that helps visually impaired individuals navigate obstacles using ultrasonic and IR sensors, providing vibration and audio feedback for safety.',
    category: 'EEE',
    price: 2699,
    tags: ['Blind Assistance', 'Ultrasonic', 'Sensor', 'Safety', 'Wearable'],
    features: [
      'Ultrasonic obstacle detection sensor',
      'IR sensor for proximity detection',
      'Vibration motor for tactile feedback',
      'Audio alert for close obstacles',
      'Rechargeable power system',
      'Compact wearable design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2323',
    title: 'Password Operated Security Control by Android Application',
    description: 'An Android-controlled security system that unlocks or controls doors and appliances using a password-protected mobile app via Bluetooth communication.',
    category: 'EEE',
    price: 2399,
    tags: ['Android', 'Bluetooth', 'Security', 'Password Control', 'Automation'],
    features: [
      'Bluetooth module for wireless communication',
      'Android app for password entry',
      'Relay module for lock control',
      'LCD for access confirmation',
      'Buzzer alert for wrong password',
      'Arduino UNO-based system design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2424',
    title: 'Real-Time Monitoring and Control System for Greenhouse',
    description: 'An automated greenhouse system that monitors temperature, humidity, and light intensity using sensors and controls fans, heaters, and lights for optimal plant growth.',
    category: 'EEE',
    price: 2699,
    tags: ['Greenhouse', 'Automation', 'Sensors', 'Monitoring', 'Embedded'],
    features: [
      'DHT11 sensor for temperature and humidity',
      'LDR sensor for light detection',
      'Relay control for fans and heaters',
      'LCD display for live environmental data',
      'Arduino microcontroller-based control',
      'Energy-efficient and reliable design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2525',
    title: 'Vehicle Safety System with Ignition Security',
    description: 'A safety system that prevents unauthorized vehicle usage by implementing ignition lock controlled through a password or RFID card. It improves vehicle security and anti-theft measures.',
    category: 'EEE',
    price: 2599,
    tags: ['Vehicle', 'Ignition Lock', 'Security', 'RFID', 'Arduino'],
    features: [
      'RFID or keypad-based ignition control',
      'Relay module for ignition cut-off',
      'Buzzer for authentication feedback',
      'LCD display for system status',
      'Microcontroller-based control unit',
      'Anti-theft design with secure authentication'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2626',
    title: 'Real-Time Implementation of Low-Cost Zigbee-Based Motion Detection System',
    description: 'A Zigbee-based wireless motion detection system that transmits intrusion alerts to a control station in real time. It is ideal for home and office security.',
    category: 'EEE',
    price: 2499,
    tags: ['Zigbee', 'Wireless', 'Motion Detection', 'Security', 'Embedded'],
    features: [
      'PIR sensor for motion detection',
      'Zigbee module for wireless data transfer',
      'Receiver unit for centralized monitoring',
      'Buzzer for local alert',
      'Low-cost, low-power design',
      'Scalable for multi-zone deployment'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2727',
    title: 'Real-Time Multi-Patient Monitoring System Based on Wireless Sensor Network',
    description: 'A wireless health monitoring system that continuously tracks multiple patients’ vital parameters and transmits them to a central unit for real-time supervision.',
    category: 'EEE',
    price: 2899,
    tags: ['Wireless', 'Health', 'Patient Monitoring', 'Sensor Network', 'IoT'],
    features: [
      'Multiple sensor nodes for patient monitoring',
      'Temperature and pulse sensors',
      'Wireless data transmission via Zigbee/Wi-Fi',
      'Central receiver for real-time data display',
      'Buzzer and alert system for anomalies',
      'Scalable architecture for hospitals'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2828',
    title: 'Wi-Fi Based Advanced Industrial Automation',
    description: 'An ESP32-based industrial automation system that allows users to control machines and monitor process parameters remotely via Wi-Fi through an IoT dashboard.',
    category: 'EEE',
    price: 2799,
    tags: ['Wi-Fi', 'Industrial Automation', 'ESP32', 'IoT', 'Control'],
    features: [
      'ESP32 microcontroller with Wi-Fi support',
      'IoT control via Blynk or Thingspeak',
      'Real-time parameter monitoring',
      'Relay-based control for machines',
      'Buzzer alerts for abnormal conditions',
      'Secure Wi-Fi-based communication'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM2929',
    title: 'Remote Monitoring in Home Automation Using Low-Cost Microcontroller',
    description: 'A cost-effective embedded system that enables remote control and monitoring of household devices using Wi-Fi-enabled microcontrollers and mobile applications.',
    category: 'EEE',
    price: 2299,
    tags: ['Home Automation', 'Wi-Fi', 'Remote Monitoring', 'Embedded', 'Control'],
    features: [
      'Wi-Fi microcontroller-based control unit',
      'Mobile app for remote device access',
      'Relay switching for multiple appliances',
      'Real-time status feedback system',
      'Low-cost and scalable design',
      'Energy-efficient operation'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3030',
    title: 'Remote-Controllable and Energy-Saving Room Architecture Based on Zigbee Communication',
    description: 'A Zigbee-based room automation system designed to control lighting and appliances remotely while reducing power consumption through smart energy management.',
    category: 'EEE',
    price: 2499,
    tags: ['Zigbee', 'Automation', 'Energy Saving', 'Wireless', 'Control'],
    features: [
      'Zigbee transceivers for wireless communication',
      'Relay modules for appliance control',
      'Temperature and light sensors for optimization',
      'LCD display for room status',
      'Arduino-based control logic',
      'Smart energy-saving algorithm'
    ],
    image: '/images/eee.png',
    
  },


  {
    id: 'PECEM3131',
    title: 'Design of Bluetooth Based Low Energy Wireless Gateway for Remote Parameter Monitoring',
    description: 'A Bluetooth Low Energy (BLE) based system designed to collect and transmit environmental or industrial parameters to a monitoring unit for data analysis and visualization.',
    category: 'EEE',
    price: 2599,
    tags: ['Bluetooth', 'Wireless', 'Monitoring', 'Low Energy', 'Embedded'],
    features: [
      'BLE module for wireless data transfer',
      'Arduino/ESP32 microcontroller for control',
      'Sensor interface for environmental data',
      'Real-time data display via mobile or PC',
      'Low power consumption gateway design',
      'Reliable short-range communication'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3232',
    title: 'Android Based Invisible Broken Wire Detection Robot',
    description: 'An intelligent robotic system controlled via Android application that detects broken electrical wires using sensors and communicates alerts wirelessly.',
    category: 'EEE',
    price: 2899,
    tags: ['Android', 'Robot', 'Broken Wire', 'Wireless', 'Detection'],
    features: [
      'Android app-based control interface',
      'Metal detection and continuity sensors',
      'Wireless communication via Bluetooth module',
      'Motor driver for robotic movement',
      'Buzzer and LED for broken wire indication',
      'Arduino UNO-based control system'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3333',
    title: 'Bluetooth Device Based Access Control System',
    description: 'A security system that allows door or device access only to authorized users through Bluetooth authentication from their smartphones.',
    category: 'EEE',
    price: 2399,
    tags: ['Bluetooth', 'Security', 'Access Control', 'Android', 'Automation'],
    features: [
      'Bluetooth-based authentication system',
      'Relay-controlled door lock mechanism',
      'Mobile app for secure access control',
      'LCD and LED indicators for status display',
      'Arduino UNO microcontroller integration',
      'Low power, secure, and scalable design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3434',
    title: 'Mobile Based Vehicle Driving System',
    description: 'A mobile-controlled vehicle prototype using Bluetooth technology, enabling wireless driving and control via an Android application.',
    category: 'EEE',
    price: 2499,
    tags: ['Bluetooth', 'Vehicle', 'Android', 'Wireless Control', 'Embedded'],
    features: [
      'Android app for direction and speed control',
      'Bluetooth communication with Arduino',
      'Motor driver for vehicle movement',
      'Obstacle detection using ultrasonic sensors',
      'Battery-powered wireless operation',
      'Simple and educational robotic system'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3535',
    title: 'GSM Based Kitchen Monitoring System',
    description: 'A safety-oriented embedded project that detects gas leakage, fire, and temperature variations in the kitchen, sending alerts to the user through GSM SMS notifications.',
    category: 'EEE',
    price: 2499,
    tags: ['GSM', 'Safety', 'Kitchen', 'Gas Sensor', 'Fire Detection'],
    features: [
      'MQ-2 gas and flame sensors',
      'GSM module for SMS alerts',
      'Buzzer alarm for emergencies',
      'LCD for live system status',
      'Relay for automatic device cutoff',
      'Compact Arduino UNO-based design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3636',
    title: 'Portable Electronic System for Health Monitoring of Elderly People',
    description: 'A portable device that continuously monitors vital parameters such as heart rate and temperature of elderly individuals and sends alerts to caregivers through wireless communication.',
    category: 'EEE',
    price: 2799,
    tags: ['Health', 'Wireless', 'Elderly Care', 'Monitoring', 'Arduino'],
    features: [
      'Heartbeat and temperature sensors',
      'Wireless transmission to a receiver unit',
      'Battery-powered wearable system',
      'Alert system for abnormal readings',
      'Arduino-based processing circuit',
      'Compact and lightweight design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3737',
    title: 'Advance Security System and Automation in Metro Trains to Prevent Accidents',
    description: 'An embedded system for metro trains that detects obstacle presence and ensures automatic braking or signaling to prevent collisions and accidents.',
    category: 'EEE',
    price: 2899,
    tags: ['Train Safety', 'Automation', 'Accident Prevention', 'Sensors', 'Embedded'],
    features: [
      'Ultrasonic obstacle detection sensors',
      'Automatic braking control system',
      'LED and buzzer signaling alerts',
      'Microcontroller-based safety logic',
      'LCD display for train status',
      'Improves safety and automation in rail systems'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3838',
    title: 'Design of Remote Intelligent Home System Based on GSM Technology',
    description: 'A GSM-based intelligent home system that allows users to monitor and control home appliances through SMS commands, ensuring convenience and safety.',
    category: 'EEE',
    price: 2399,
    tags: ['GSM', 'Home Automation', 'Intelligent System', 'Remote Control', 'Arduino'],
    features: [
      'GSM module for bidirectional communication',
      'Relay control for appliances',
      'SMS-based on/off control interface',
      'LCD display for system updates',
      'Arduino microcontroller integration',
      'Secure and user-friendly design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM3939',
    title: 'ATM Security System with RFID',
    description: 'A security enhancement system for ATMs that uses RFID cards to authenticate users before granting access, preventing unauthorized withdrawals and ATM misuse.',
    category: 'EEE',
    price: 2599,
    tags: ['RFID', 'ATM', 'Security', 'Authentication', 'Arduino'],
    features: [
      'RFID reader for user identification',
      'Arduino-controlled authentication process',
      'Buzzer and LED for feedback',
      'Relay control for secure access',
      'LCD for transaction status display',
      'Compact and reliable security system'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM4040',
    title: 'Low Frequency RFID Based Object Identification System for Blind People',
    description: 'An assistive technology system for visually impaired individuals that uses RFID tags to identify objects and provides audio output to help with daily tasks.',
    category: 'EEE',
    price: 2699,
    tags: ['RFID', 'Assistive Tech', 'Blind Aid', 'Object Detection', 'Embedded'],
    features: [
      'Low-frequency RFID tag and reader system',
      'Arduino-based processing unit',
      'Audio module for object identification feedback',
      'Portable and user-friendly design',
      'Rechargeable battery support',
      'Cost-effective assistive solution'
    ],
    image: '/images/eee.png',
    
  },


  {
    id: 'PECEM5151',
    title: 'Remote Metal Detecting Robot to Assist Bomb Detection and Rescue Team',
    description: 'A remote-controlled robot designed for bomb detection and rescue missions using a metal detector sensor. It ensures safety by allowing operators to inspect hazardous zones from a distance.',
    category: 'EEE',
    price: 2999,
    tags: ['Robot', 'Metal Detection', 'Remote Control', 'Safety', 'Wireless'],
    features: [
      'Wireless remote control system',
      'Metal detection sensor integration',
      'Motor driver for robot movement',
      'Buzzer and LED indicators for alerts',
      'Camera module integration (optional)',
      'Strong chassis for field operation'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5252',
    title: 'RF Controlled Metal Detecting Robot',
    description: 'An RF-based robot that detects metallic objects in its path and provides real-time alerts. The system is useful for security inspection and industrial metal detection.',
    category: 'EEE',
    price: 2599,
    tags: ['RF', 'Robot', 'Metal Detection', 'Wireless', 'Embedded'],
    features: [
      'RF transmitter and receiver control units',
      'Metal detection sensor',
      'DC motors with motor driver circuit',
      'Arduino-based controller logic',
      'Buzzer alert for metal presence',
      'Compact and portable robotic design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5353',
    title: 'Smart Host Microcontroller for Optimal Battery Charging in a Solar-Powered Robotic Vehicle',
    description: 'A solar-powered robotic vehicle that uses a smart charging controller to optimize battery usage and ensure efficient solar energy management for continuous operation.',
    category: 'EEE',
    price: 3199,
    tags: ['Solar', 'Battery Charging', 'Robot', 'Automation', 'Embedded'],
    features: [
      'Solar panel integration for charging',
      'Charge controller for optimal battery use',
      'Microcontroller for smart energy management',
      'DC motor control for robotic motion',
      'LCD display for voltage monitoring',
      'Eco-friendly and efficient design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5454',
    title: 'Wireless Data Acquisition and Transmission System Design',
    description: 'A wireless data acquisition system that collects sensor data such as temperature and humidity and transmits it to a remote monitoring unit using RF or Zigbee communication.',
    category: 'EEE',
    price: 2699,
    tags: ['Wireless', 'Data Acquisition', 'Zigbee', 'RF', 'Monitoring'],
    features: [
      'Sensor interface for real-time data collection',
      'Wireless data transmission module (RF/Zigbee)',
      'LCD for local data display',
      'Microcontroller-based processing unit',
      'Receiver unit for remote monitoring',
      'Reliable and low-cost design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5555',
    title: 'Zigbee Based Intelligent Road Traffic Control System',
    description: 'An intelligent traffic management system that uses Zigbee-based communication between junctions to manage signal timing and reduce congestion automatically.',
    category: 'EEE',
    price: 2899,
    tags: ['Zigbee', 'Traffic Control', 'Automation', 'Wireless', 'Embedded'],
    features: [
      'Zigbee modules for inter-junction communication',
      'IR sensors for vehicle detection',
      'Arduino for traffic signal control',
      'LCD display for traffic information',
      'Automatic light timing adjustment',
      'Low-power intelligent traffic solution'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5656',
    title: 'Advanced Robot for Military Applications',
    description: 'A wireless-controlled robot designed for defense operations such as surveillance, bomb detection, and terrain navigation in hazardous areas.',
    category: 'EEE',
    price: 3399,
    tags: ['Military', 'Robot', 'Wireless', 'Surveillance', 'Embedded'],
    features: [
      'Wireless remote operation system',
      'Camera integration for live video feed',
      'Metal detection and obstacle sensors',
      'DC motor control system',
      'Arduino-based operation logic',
      'Rugged design for military use'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5757',
    title: 'Energy Management with Zigbee Sensor Network',
    description: 'A Zigbee-based energy management system that monitors power consumption across multiple devices and transmits data wirelessly to a central server for analysis.',
    category: 'EEE',
    price: 2899,
    tags: ['Zigbee', 'Energy Management', 'Wireless', 'IoT', 'Embedded'],
    features: [
      'Zigbee sensor nodes for energy data collection',
      'Microcontroller for power computation',
      'Central receiver for data aggregation',
      'LCD for real-time consumption display',
      'Low energy communication network',
      'Smart grid-compatible design'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5858',
    title: 'Zigbee Based Automatic Street Light Controlling System',
    description: 'An automated street lighting system that uses Zigbee communication and LDR sensors to control street lights based on ambient light and motion detection.',
    category: 'EEE',
    price: 2599,
    tags: ['Zigbee', 'Street Light', 'Automation', 'Energy Saving', 'Sensors'],
    features: [
      'LDR sensors for ambient light detection',
      'Zigbee-based wireless coordination',
      'Arduino microcontroller control logic',
      'Relay modules for light control',
      'Buzzer and LED indicators for maintenance alerts',
      'Energy-efficient lighting automation'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM5959',
    title: 'Wi-Fi Based Communication and Localization of an Autonomous Mobile Robot for Refinery Inspection',
    description: 'An autonomous robot using Wi-Fi communication and sensors for navigation and inspection in refinery environments, capable of sending live data to a monitoring system.',
    category: 'EEE',
    price: 3299,
    tags: ['Wi-Fi', 'Robot', 'Autonomous', 'Localization', 'Inspection'],
    features: [
      'Wi-Fi communication module',
      'Ultrasonic and infrared sensors for navigation',
      'Camera for live monitoring',
      'Microcontroller-based motion control',
      'Real-time data transmission system',
      'Safe operation in hazardous zones'
    ],
    image: '/images/eee.png',
    
  },
  {
    id: 'PECEM6060',
    title: 'Online Temperature Monitoring Based on Wireless Sensor Networks',
    description: 'A wireless sensor network-based system for monitoring and recording temperature variations across multiple locations, transmitting real-time data to a central server.',
    category: 'EEE',
    price: 2699,
    tags: ['Wireless Sensor Network', 'Temperature', 'Monitoring', 'IoT', 'Embedded'],
    features: [
      'Wireless temperature sensor nodes',
      'Data transmission to central gateway',
      'Microcontroller for sensor interfacing',
      'LCD display for node data',
      'Low-power wireless communication',
      'Scalable and reliable architecture'
    ],
    image: '/images/eee.png'
    
  },
  {
  id: 'PEEMA0161',
  title: 'A Generalized Switched Inductor Cell Modular Multilevel Inverter',
  description: 'Design and simulation of a modular multilevel inverter using generalized switched-inductor cells to enhance voltage levels and minimize harmonic distortion. Developed and tested in MATLAB/Simulink with THD and efficiency evaluation.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Simulink', 'Multilevel Inverter', 'Power Electronics', 'Harmonics'],
  features: [
    'Complete Simulink model with control logic',
    'Harmonic and efficiency analysis report',
    'Switching strategy and waveform results',
    'Project report and IEEE paper reference'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0262',
  title: 'A High Power Interleaved Parallel Topology Full-Bridge LLC Converter for Off-Board Charger',
  description: 'Simulation and performance study of a high-power interleaved parallel full-bridge LLC converter for off-board EV charging systems. Emphasis on soft-switching operation, reduced current ripple, and improved thermal balance.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'EV Charger', 'LLC Converter', 'Interleaved Topology', 'Power Electronics'],
  features: [
    'Complete LLC converter MATLAB model',
    'Soft-switching and thermal performance tests',
    'Efficiency and frequency control simulation',
    'Technical documentation and schematics'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0363',
  title: 'A Low-harmonic Control Method of Bi-directional Three-phase Z-source Converters for Vehicle-to-Grid Applications',
  description: 'Implements a control algorithm for bidirectional Z-source converters enabling Vehicle-to-Grid power transfer with minimal harmonic distortion. MATLAB/Simulink used for modeling and control system validation.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Z-source Converter', 'Vehicle-to-Grid', 'Control Systems', 'Renewable Energy'],
  features: [
    'Bidirectional Z-source converter simulation',
    'Low-harmonic control logic implementation',
    'V2G mode verification and performance graphs',
    'Simulation files and detailed explanation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0464',
  title: 'Microgrid Based on Wind Driven DFIG, DG and Solar PV Array for Optimal Fuel Consumption',
  description: 'Design of a hybrid microgrid integrating DFIG-based wind, solar PV, and diesel generator units with an optimal energy management strategy for minimum fuel usage and high reliability, simulated in MATLAB/Simulink.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Microgrid', 'DFIG', 'Solar PV', 'Energy Management'],
  features: [
    'Complete hybrid microgrid simulation',
    'Fuel consumption optimization algorithm',
    'Load balancing and scheduling logic',
    'Performance plots and detailed report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0565',
  title: 'A New Multi-Output DC-DC Converter for Electric Vehicle Application',
  description: 'Develops a high-efficiency multi-output DC–DC converter for electric vehicles providing multiple voltage levels with dynamic load regulation. MATLAB used to analyze efficiency and transient response.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'EV Systems', 'DC-DC Converter', 'Power Electronics'],
  features: [
    'Multi-output converter Simulink model',
    'Transient and efficiency testing',
    'Control loop and switching design',
    'Schematic and project report files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0666',
  title: 'A New Proposal for the Design of Hybrid AC/DC Microgrids Toward High Power Quality',
  description: 'Presents a coordinated control and converter design for hybrid AC/DC microgrids improving power quality and reducing voltage imbalance under dynamic load conditions. Implemented and tested in MATLAB/Simulink.',
  category: 'EEE',
  price: 5399,
  tags: ['MATLAB', 'Hybrid Microgrid', 'AC/DC System', 'Power Quality', 'Control System'],
  features: [
    'AC/DC hybrid grid MATLAB/Simulink model',
    'Power quality improvement strategy',
    'Voltage and current waveform analysis',
    'Graphs, report, and simulation guide'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0767',
  title: 'A New Step-Up Switched-Capacitor Voltage Balancing Converter for NPC Multilevel Inverter-Based Solar PV System',
  description: 'Design of a switched-capacitor voltage balancing converter for NPC multilevel inverter systems using solar PV input. Ensures high voltage gain and reduced stress on switches. Modeled using MATLAB/Simulink.',
  category: 'EEE',
  price: 4899,
  tags: ['MATLAB', 'Switched Capacitor', 'NPC Inverter', 'Solar PV'],
  features: [
    'Step-up converter and inverter simulation',
    'Voltage balancing algorithm',
    'MPPT integrated solar system model',
    'Full documentation and test results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0868',
  title: 'A New Topology of Asymmetrical Multilevel Inverter with Reduced Switch Count for Electric Drive Applications',
  description: 'Proposes an asymmetrical multilevel inverter topology with reduced switches, improving power density and drive performance. MATLAB simulation includes modulation and drive control strategy.',
  category: 'EEE',
  price: 5199,
  tags: ['MATLAB', 'Multilevel Inverter', 'Electric Drive', 'Topology Design'],
  features: [
    'Asymmetrical inverter Simulink setup',
    'Switch reduction and modulation study',
    'Motor drive test and efficiency results',
    'Simulation files and full report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA0969',
  title: 'A New Wave Energy Converter for Marine Data Buoy',
  description: 'Simulation of a compact wave energy converter to power marine buoys. Focuses on energy extraction from ocean waves using a mechanical–electrical model developed in MATLAB/Simulink.',
  category: 'EEE',
  price: 4399,
  tags: ['MATLAB', 'Wave Energy', 'Marine', 'Renewable Energy'],
  features: [
    'Wave converter MATLAB/Simulink model',
    'PTO system simulation',
    'Power capture efficiency tests',
    'Graphs, report, and mechanical model'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1070',
  title: 'A Novel Control Scheme for Wind Turbine Driven DFIG Interfaced to Utility Grid',
  description: 'Implements an advanced control scheme for grid-connected DFIG wind turbines ensuring stable operation under varying wind speeds. Includes grid synchronization and reactive power control in MATLAB.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'DFIG', 'Wind Turbine', 'Grid Integration', 'Control Systems'],
  features: [
    'DFIG-based wind turbine MATLAB model',
    'Grid synchronization and power control',
    'Reactive power and MPPT implementation',
    'Simulation outputs and project report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1171',
  title: 'A Novel Controlled Frequency Band Impedance Measurement Approach for Single-Phase Railway Traction Power System',
  description: 'Develops a controlled frequency band impedance measurement technique for single-phase railway traction systems. MATLAB/Simulink is used to study resonance suppression and network stability under traction loads.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'Railway Traction', 'Impedance Measurement', 'Power System Stability'],
  features: [
    'Single-phase traction system Simulink model',
    'Controlled frequency impedance measurement block',
    'Stability and resonance analysis',
    'Simulation data and report documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1272',
  title: 'A Novel Fault Ride Through Scheme for Hybrid Wind/PV Power Generation Systems',
  description: 'Implements a hybrid fault ride-through control for grid-connected wind-PV systems ensuring voltage stability during grid faults. Includes fault-tolerant control and grid-code compliance simulation.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Hybrid System', 'Wind-PV', 'Fault Ride Through', 'Grid Stability'],
  features: [
    'Hybrid wind/PV power system model',
    'Dynamic fault ride-through simulation',
    'Grid voltage and current monitoring blocks',
    'IEEE-based technical report and results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1373',
  title: 'A Single Input Variable FLC for DFIG Based WPGS in Standalone Mode',
  description: 'Design of a single-input fuzzy logic controller (FLC) for standalone DFIG-based wind power generation system (WPGS). MATLAB simulation focuses on efficient voltage and frequency regulation.',
  category: 'EEE',
  price: 4799,
  tags: ['MATLAB', 'DFIG', 'Wind Power', 'Fuzzy Logic', 'Control System'],
  features: [
    'FLC-based DFIG control model',
    'Standalone operation under load variation',
    'Voltage/frequency stability analysis',
    'Simulation plots and documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1474',
  title: 'A Switch-Source Cell-Based Cascaded Multilevel Inverter Topology with Minimum Number of Power Electronics Components',
  description: 'Proposes a new cascaded multilevel inverter using switch-source cells to reduce power electronic components and switching losses. MATLAB model validates harmonic performance and efficiency.',
  category: 'EEE',
  price: 5099,
  tags: ['MATLAB', 'Multilevel Inverter', 'Power Electronics', 'Topology Design'],
  features: [
    'Switch-source cell topology design',
    'Reduced switch count analysis',
    'THD and efficiency evaluation in Simulink',
    'Circuit diagram and full documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1575',
  title: 'Adaptive Control of Voltage Source Converter Based Scheme for Power Quality Improved Grid-Interactive Solar PV-Battery System',
  description: 'Implements adaptive control on a grid-interactive solar PV-battery system using a voltage source converter to improve power quality and reactive power compensation. Simulated in MATLAB/Simulink.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Solar PV', 'VSC', 'Power Quality', 'Adaptive Control'],
  features: [
    'Grid-connected PV-battery model',
    'Adaptive control algorithm and simulation results',
    'Power factor and THD analysis',
    'Performance graphs and project report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1676',
  title: 'Advanced Control Strategy of DFIG Based Wind Turbine using Combined Artificial Neural Network and PSO Algorithm',
  description: 'Designs an ANN–PSO based hybrid control system for DFIG wind turbines to improve dynamic response and power extraction efficiency under fluctuating wind conditions.',
  category: 'EEE',
  price: 5999,
  tags: ['MATLAB', 'DFIG', 'ANN', 'PSO', 'Optimization'],
  features: [
    'DFIG wind turbine hybrid control simulation',
    'Neural network and PSO algorithm integration',
    'Performance optimization and MPPT testing',
    'Technical report with comparative analysis'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1777',
  title: 'An Adaptive D-FACTS for Power Quality Enhancement in an Isolated Microgrid',
  description: 'Develops an adaptive distributed FACTS controller for isolated microgrids to improve voltage regulation and power quality under varying load conditions.',
  category: 'EEE',
  price: 5299,
  tags: ['MATLAB', 'D-FACTS', 'Microgrid', 'Power Quality', 'Control Systems'],
  features: [
    'Adaptive D-FACTS Simulink model',
    'Voltage stability and reactive power tests',
    'Isolated microgrid case study',
    'Simulation results and documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1878',
  title: 'An Efficient Inductive Power Transfer Topology for Electric Vehicle Battery Charging',
  description: 'Simulates a contactless inductive power transfer system optimized for EV battery charging. Includes resonant compensation and coupling efficiency analysis using MATLAB/Simulink.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'EV Charging', 'Inductive Power Transfer', 'Wireless Charging'],
  features: [
    'Resonant IPT system simulation',
    'Coupling coefficient and loss study',
    'Soft-switching performance graphs',
    'Documentation and efficiency results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA1979',
  title: 'Cascaded Multilevel Inverter Based Power and Signal Multiplex Transmission for Electric Vehicles',
  description: 'Design of a cascaded multilevel inverter for simultaneous power and signal transmission in EV systems. MATLAB model validates harmonic performance and control synchronization.',
  category: 'EEE',
  price: 5199,
  tags: ['MATLAB', 'Multilevel Inverter', 'Electric Vehicle', 'Signal Transmission'],
  features: [
    'EV inverter system MATLAB model',
    'Power-signal multiplex simulation',
    'Synchronization and harmonic study',
    'Waveforms, graphs, and project files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2080',
  title: 'Cascaded Multilevel PV Inverter with Improved Harmonic Performance During Power Imbalance Between Power Cells',
  description: 'Proposes a cascaded PV inverter topology with harmonic mitigation under unequal power sharing among cells. MATLAB/Simulink used for harmonic and grid interaction analysis.',
  category: 'EEE',
  price: 4899,
  tags: ['MATLAB', 'PV System', 'Multilevel Inverter', 'Harmonics'],
  features: [
    'Cascaded PV inverter MATLAB simulation',
    'Harmonic compensation under imbalance',
    'Control algorithm implementation',
    'Simulation plots and performance analysis'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2181',
  title: 'Combining Electric Vehicle Battery Charging and Battery Cell Equalization in One Circuit',
  description: 'Integrates EV battery charging and cell equalization functions into a single converter topology to simplify circuitry and improve battery health. MATLAB/Simulink used for modeling and efficiency analysis.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Electric Vehicle', 'Battery Charging', 'Cell Equalization', 'Power Electronics'],
  features: [
    'Integrated charging and equalization Simulink model',
    'Cell balancing algorithm with SoC tracking',
    'Efficiency and charging time analysis',
    'Technical report and complete documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2282',
  title: 'Comparison of Different Control Methods for Maximum Power Point Tracking of Solar and Wind Energy',
  description: 'Compares popular MPPT algorithms for hybrid solar–wind energy systems including P&O, Incremental Conductance, and Fuzzy Logic methods. MATLAB used for detailed performance analysis.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'MPPT', 'Solar Energy', 'Wind Energy', 'Fuzzy Logic'],
  features: [
    'Hybrid solar-wind Simulink model',
    'Implementation of multiple MPPT algorithms',
    'Power output comparison under variable conditions',
    'Performance graphs and summary report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2383',
  title: 'Cost-Efficient Strategy for High Renewable Energy Penetration in Isolated Power Systems',
  description: 'Proposes an optimal energy management approach for isolated systems with high renewable penetration, minimizing cost and maintaining reliability using MATLAB-based optimization routines.',
  category: 'EEE',
  price: 5399,
  tags: ['MATLAB', 'Renewable Energy', 'Optimization', 'Energy Management', 'Microgrid'],
  features: [
    'Isolated microgrid model with renewable sources',
    'Cost optimization using MATLAB optimization toolbox',
    'Load dispatch and generation scheduling analysis',
    'Simulation results and cost comparison charts'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2484',
  title: 'Coupled Wireless Charging System for Electric Vehicles',
  description: 'Design and simulation of a coupled magnetic wireless charging system for electric vehicles using resonant inductive power transfer. Includes coil design and efficiency improvement study.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'EV Charging', 'Wireless Power', 'Inductive Coupling'],
  features: [
    'Resonant inductive coupling MATLAB model',
    'Efficiency and misalignment analysis',
    'Coil and resonant tank design parameters',
    'Simulation results and documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2585',
  title: 'A Two-Stage Kalman Filter for Cyber-Attack Detection in Automatic Generation Control System',
  description: 'Implements a dual-stage Kalman Filter for detecting cyber-attacks in automatic generation control systems. Simulates real-time disturbances and estimation errors in MATLAB/Simulink.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Cybersecurity', 'Kalman Filter', 'Power System Control'],
  features: [
    'AGC system model with attack simulation',
    'Two-stage Kalman filter implementation',
    'Error detection and correction analysis',
    'Comprehensive technical report and graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2686',
  title: 'Delta-Bar-Delta Neural Network Based Control Approach for Power Quality Improvement of Solar PV Interfaced Distribution System',
  description: 'Employs a Delta-Bar-Delta learning neural network to enhance the control of a solar PV integrated grid for improved voltage and current waveforms. Simulated in MATLAB/Simulink.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Neural Network', 'Solar PV', 'Power Quality', 'Machine Learning'],
  features: [
    'Neural network controller for PV grid system',
    'Power quality and harmonic performance evaluation',
    'Training data and adaptive learning results',
    'Simulation report and waveform outputs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2787',
  title: 'Design and Control of Magnetic Levitation System by Optimizing Fractional Order PID Controller Using Ant Colony Optimization Algorithm',
  description: 'Designs a magnetic levitation control system using a fractional-order PID controller optimized through the Ant Colony Optimization algorithm in MATLAB.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Control System', 'Optimization', 'PID Controller', 'Ant Colony'],
  features: [
    'Magnetic levitation system Simulink model',
    'Fractional-order PID controller implementation',
    'ACO optimization routine and convergence plots',
    'Simulation data and documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2888',
  title: 'Design and Implementation of Multilevel Inverters for Electric Vehicles',
  description: 'Simulates the performance of different multilevel inverter architectures for electric vehicle drives with focus on efficiency, THD, and control algorithms in MATLAB/Simulink.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'Multilevel Inverter', 'Electric Vehicle', 'Drive System'],
  features: [
    'Comparison of inverter topologies for EV',
    'Switching control and THD analysis',
    'Simulink model and waveform results',
    'Report with comparison tables and notes'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA2989',
  title: 'Development of an Adaptive Neuro-Fuzzy Inference System–Based Equivalent Consumption Minimisation Strategy to Improve Fuel Economy in Hybrid Electric Vehicles',
  description: 'Proposes an ANFIS-based equivalent consumption minimization strategy (ECMS) to optimize fuel efficiency in hybrid electric vehicles. MATLAB used for hybrid drive cycle simulation.',
  category: 'EEE',
  price: 5999,
  tags: ['MATLAB', 'ANFIS', 'Hybrid EV', 'Fuel Optimization', 'Intelligent Control'],
  features: [
    'ANFIS model integration for hybrid EV',
    'Fuel economy optimization test cycles',
    'Comparison with traditional ECMS control',
    'Simulation report and algorithm flowchart'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3090',
  title: 'Distance Protection Scheme for DC Distribution Systems Based on the High Frequency Characteristics of Faults',
  description: 'Implements a high-frequency fault detection technique for distance protection in DC distribution networks. Includes analysis of transient features and relay operation in MATLAB/Simulink.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'DC Distribution', 'Protection System', 'Fault Detection'],
  features: [
    'DC system protection simulation',
    'High-frequency fault characteristic analysis',
    'Distance protection algorithm implementation',
    'Simulation results and graphs for relay response'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3191',
  title: 'Dynamic Current Sharing, Voltage and SOC Regulation for HESS Based DC Microgrid Using CPISMC Technique',
  description: 'Implements a Composite Proportional–Integral Sliding Mode Controller (CPISMC) for hybrid energy storage systems in DC microgrids. Focuses on balanced current sharing and state-of-charge regulation between battery and supercapacitor.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'HESS', 'DC Microgrid', 'Sliding Mode Control', 'Energy Storage'],
  features: [
    'Complete HESS Simulink model',
    'CPISMC-based control implementation',
    'SOC balancing and dynamic response plots',
    'Technical documentation and controller tuning guide'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3292',
  title: 'Dynamic Voltage Support for Low-Voltage Ride-Through Operation in Single-Phase Grid-Connected Photovoltaic Systems',
  description: 'Presents a voltage-support strategy for grid-connected PV systems to achieve Low-Voltage Ride-Through compliance during grid faults using MATLAB/Simulink modeling and dynamic control.',
  category: 'EEE',
  price: 5199,
  tags: ['MATLAB', 'Photovoltaic', 'Grid-Connected', 'LVRT', 'Control Systems'],
  features: [
    'Single-phase PV grid Simulink model',
    'LVRT control implementation and testing',
    'Voltage sag compensation and current control',
    'Comprehensive report with waveform analysis'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3393',
  title: 'Electric Vehicle Recharge Strategies for Frequency Control in Electrical Power Systems with High Wind Power Generation',
  description: 'Explores the use of electric vehicle charging and discharging to aid frequency regulation in wind-dominated grids. MATLAB used to analyze frequency deviation and vehicle aggregation control.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'Electric Vehicle', 'Frequency Control', 'Wind Power', 'Smart Grid'],
  features: [
    'EV aggregation model with grid interface',
    'Frequency control through charging strategy',
    'Wind generation simulation and stability tests',
    'Performance evaluation and report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3494',
  title: 'Enabling Utility-Scale Solar PV Plants for Electromechanical Oscillation Damping',
  description: 'Implements a damping controller in utility-scale PV plants to suppress electromechanical oscillations in power systems. MATLAB/Simulink used for small-signal stability analysis.',
  category: 'EEE',
  price: 5499,
  tags: ['MATLAB', 'Solar PV', 'Oscillation Damping', 'Power System Stability'],
  features: [
    'Grid-connected PV damping controller model',
    'Small-signal and transient stability study',
    'Eigenvalue and modal analysis results',
    'Simulation files and detailed report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3595',
  title: 'Energy Efficiency Enhancement in Full-Bridge PV Inverters with Advanced Modulations',
  description: 'Designs and compares advanced PWM strategies to improve the efficiency of full-bridge PV inverters. MATLAB simulation demonstrates harmonic and loss reduction.',
  category: 'EEE',
  price: 5099,
  tags: ['MATLAB', 'PV Inverter', 'PWM', 'Efficiency', 'Power Electronics'],
  features: [
    'Full-bridge inverter MATLAB model',
    'Comparison of modulation techniques',
    'Efficiency and THD performance graphs',
    'Documentation and test results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3696',
  title: 'Energy Management System for Small-Scale Hybrid Wind-Solar-Battery Based Microgrid',
  description: 'Designs an energy management system for a small-scale hybrid microgrid integrating wind, solar, and battery storage. Includes scheduling, power balance, and cost optimization.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Microgrid', 'Energy Management', 'Hybrid System', 'Optimization'],
  features: [
    'Wind-solar-battery microgrid Simulink model',
    'EMS scheduling and cost optimization algorithm',
    'Load-demand and SOC graphs',
    'Simulation results and report file'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3797',
  title: 'Fuzzy Logic Based Improvement of UPFC Performance in Power System',
  description: 'Implements a fuzzy logic controller to enhance Unified Power Flow Controller (UPFC) performance for voltage and power flow regulation. MATLAB/Simulink used for dynamic testing.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'UPFC', 'Fuzzy Logic', 'Power Quality', 'FACTS'],
  features: [
    'UPFC model integrated with fuzzy logic controller',
    'Voltage regulation and line flow control study',
    'Dynamic response plots and comparison',
    'Simulation report with fuzzy rule base'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3898',
  title: 'Grid Connected PV System Using Multilevel Inverter',
  description: 'Design and simulation of a grid-connected solar PV system using a multilevel inverter for reduced harmonics and improved voltage quality.',
  category: 'EEE',
  price: 4699,
  tags: ['MATLAB', 'Grid Connected', 'PV System', 'Multilevel Inverter'],
  features: [
    'Solar PV with inverter MATLAB model',
    'Grid synchronization and harmonic analysis',
    'Power quality improvement graphs',
    'Full documentation and model files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA3999',
  title: 'Grid Synchronization of WEC-PV-BES Based Distributed Generation System Using Robust Control Strategy',
  description: 'Simulates a hybrid distributed generation system combining wave, PV, and battery sources. Uses a robust controller for grid synchronization and stability maintenance.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Distributed Generation', 'Robust Control', 'WEC', 'PV System'],
  features: [
    'Hybrid WEC-PV-BES MATLAB model',
    'Robust controller for grid synchronization',
    'Voltage and frequency stability evaluation',
    'Simulation outputs and report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4090',
  title: 'Grid-Connected Wind-Photovoltaic Cogeneration Using Back-to-Back Voltage Source Converters',
  description: 'Designs a cogeneration model integrating wind and PV sources through back-to-back voltage source converters for seamless grid connection and efficient power sharing.',
  category: 'EEE',
  price: 5499,
  tags: ['MATLAB', 'Wind-PV', 'Cogeneration', 'VSC', 'Grid Integration'],
  features: [
    'Wind-PV cogeneration MATLAB/Simulink model',
    'Control of back-to-back converters',
    'Power sharing and efficiency tests',
    'Graphs, report, and reference data'
  ],
image: '/images/matlab.png'},

{
  id: 'PEEMA4191',
  title: 'Identification of Faults in Microgrid Using Artificial Neural Networks',
  description: 'Employs Artificial Neural Networks (ANN) for intelligent fault detection and classification in microgrids. MATLAB/Simulink model includes fault scenarios for voltage and current waveform analysis.',
  category: 'EEE',
  price: 5299,
  tags: ['MATLAB', 'Microgrid', 'ANN', 'Fault Detection', 'Intelligent System'],
  features: [
    'Microgrid Simulink model with fault injection',
    'ANN-based fault classification system',
    'Training data and confusion matrix results',
    'Documentation and performance analysis report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4292',
  title: 'Implementation of Solar PV-Battery and Diesel Generator Based Electric Vehicle Charging Station',
  description: 'Develops a hybrid EV charging station model integrating solar PV, battery storage, and diesel generator backup to ensure uninterrupted charging and power reliability.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'EV Charging', 'Hybrid System', 'Solar PV', 'Battery Storage'],
  features: [
    'Hybrid EV charging station MATLAB model',
    'Energy management and power flow control',
    'Diesel generator backup simulation',
    'Performance graphs and system design report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4393',
  title: 'Improved Power Quality in a Solar PV Plant Integrated Utility Grid by Employing a Novel Adaptive Current Regulator',
  description: 'Implements an adaptive current regulator to enhance power quality in grid-tied solar PV systems. MATLAB simulation includes THD, voltage sag, and current waveform studies.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Solar PV', 'Power Quality', 'Adaptive Control', 'Grid Integration'],
  features: [
    'Solar PV grid-tied system with adaptive regulator',
    'Current and voltage THD performance',
    'Adaptive algorithm MATLAB implementation',
    'Simulation report with waveform analysis'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4494',
  title: 'Improvement of Power Quality Using Fuzzy Based Unified Power Flow Controller',
  description: 'Integrates fuzzy logic control into a Unified Power Flow Controller (UPFC) to improve voltage regulation and minimize harmonic distortion in a power grid.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'UPFC', 'Fuzzy Logic', 'FACTS', 'Power Quality'],
  features: [
    'UPFC system MATLAB/Simulink model',
    'Fuzzy controller design and rule base',
    'Dynamic response analysis and THD evaluation',
    'Graphs, documentation, and test results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4595',
  title: 'Integration of Solar PV into Grid Using a New UPQC with Differential Inverter Control',
  description: 'Designs a Unified Power Quality Conditioner (UPQC) with differential inverter control to integrate solar PV into the grid while maintaining voltage and current quality.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'UPQC', 'Solar PV', 'Grid Integration', 'Power Quality'],
  features: [
    'Solar PV-UPQC hybrid model in Simulink',
    'Differential inverter control implementation',
    'Grid synchronization and waveform plots',
    'Project documentation and report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4696',
  title: 'Local Fault Location in Meshed DC Microgrids Based on Parameter Estimation Technique',
  description: 'Implements a parameter estimation method for fault location in meshed DC microgrids. MATLAB/Simulink used for transient signal analysis and fault distance estimation.',
  category: 'EEE',
  price: 5299,
  tags: ['MATLAB', 'DC Microgrid', 'Fault Detection', 'Parameter Estimation'],
  features: [
    'DC microgrid simulation with fault scenarios',
    'Parameter estimation-based fault location',
    'Accuracy and delay performance tests',
    'Report with comparative analysis graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4797',
  title: 'Maximum Power Point Tracking for Wind Turbine Using Integrated Generator–Rectifier Systems',
  description: 'Simulates an integrated generator–rectifier system for wind turbines using MPPT control for maximum energy extraction. Focus on power optimization and converter efficiency.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'Wind Energy', 'MPPT', 'Rectifier', 'Power Electronics'],
  features: [
    'Wind generator-rectifier MATLAB model',
    'MPPT algorithm implementation and results',
    'Efficiency and transient response plots',
    'Full report and simulation files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4898',
  title: 'MCPWM Based 21 Level Inverter Design for Grid Connected PV System',
  description: 'Develops a 21-level inverter using Modified Carrier PWM (MCPWM) for grid-connected PV systems to minimize harmonics and improve voltage control.',
  category: 'EEE',
  price: 5499,
  tags: ['MATLAB', 'MCPWM', 'Multilevel Inverter', 'Solar PV', 'Grid Connected'],
  features: [
    '21-level inverter design with MCPWM',
    'THD and switching loss analysis',
    'Simulink model and grid performance plots',
    'Documentation and efficiency report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA4999',
  title: 'Mitigating Power Fluctuations for Energy Storage in Wind Energy Conversion System Using Supercapacitors',
  description: 'Implements a supercapacitor-based energy storage system to reduce power fluctuations in wind energy systems. MATLAB simulation includes dynamic response and SOC tracking.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'Wind Energy', 'Supercapacitor', 'Energy Storage', 'Power Fluctuation'],
  features: [
    'Wind-SC hybrid Simulink model',
    'Fluctuation mitigation and SOC balancing',
    'Power quality improvement graphs',
    'Full report and technical details'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA50100',
  title: 'Mitigation of Transient Overvoltages in Microgrid Including PV Arrays',
  description: 'Analyzes and mitigates transient overvoltages in PV-integrated microgrids using surge protection and control techniques modeled in MATLAB/Simulink.',
  category: 'EEE',
  price: 5399,
  tags: ['MATLAB', 'Microgrid', 'Overvoltage', 'PV Array', 'Protection System'],
  features: [
    'Microgrid transient simulation model',
    'Surge mitigation and voltage limiter design',
    'Transient waveform and THD analysis',
    'Complete report and simulation data'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA51101',
  title: 'Novel Symmetric Modular Hybrid Multilevel Inverter with Reduced Number of Semiconductors and Low Voltage Stress Across Switches',
  description: 'Designs and simulates a symmetric modular hybrid multilevel inverter topology that minimizes semiconductor usage and voltage stress, enhancing efficiency and reducing cost. MATLAB/Simulink used for performance analysis.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Hybrid Inverter', 'Multilevel', 'Efficiency', 'Power Electronics'],
  features: [
    'Complete hybrid multilevel inverter simulation',
    'Voltage stress and loss analysis',
    'Harmonic and switching performance results',
    'Comprehensive documentation and graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA52102',
  title: 'Off-Board Electric Vehicle Battery Charger Using PV Array',
  description: 'Develops a PV-fed off-board EV charger with DC-DC conversion and maximum power point tracking for efficient energy transfer. Designed and tested in MATLAB/Simulink.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'EV Charger', 'Solar PV', 'MPPT', 'DC Converter'],
  features: [
    'PV-integrated charger MATLAB model',
    'DC-DC converter and control algorithm',
    'MPPT simulation and efficiency plots',
    'Technical documentation with graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA53103',
  title: 'On-Board Single-Phase Integrated Electric Vehicle Charger with V2G Functionality',
  description: 'Designs an integrated on-board EV charger capable of Vehicle-to-Grid operation. The model demonstrates bidirectional power transfer and grid synchronization using MATLAB.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'V2G', 'EV Charger', 'Bidirectional', 'Control'],
  features: [
    'On-board bidirectional EV charger simulation',
    'Grid synchronization control logic',
    'Charging and discharging efficiency results',
    'Project report and simulation files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA54104',
  title: 'Optimal Design of Fractional Order PID Controller Based Automatic Voltage Regulator System Using Gradient-Based Optimization Algorithm',
  description: 'Implements a fractional-order PID controller for an AVR system, optimized through gradient-based algorithms for enhanced response and minimized overshoot.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'PID Controller', 'AVR', 'Optimization', 'Control System'],
  features: [
    'Fractional PID MATLAB/Simulink model',
    'Gradient-based optimization implementation',
    'Frequency response and transient plots',
    'Simulation data and report files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA55105',
  title: 'Performance Improvement of Hybrid Renewable Energy Sources Connected to the Grid Using Artificial Neural Network and Sliding Mode Control',
  description: 'Develops a hybrid ANN–Sliding Mode controller for grid-connected renewable systems to ensure stable power injection and improved transient behavior.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Hybrid System', 'ANN', 'Sliding Mode', 'Renewable Energy'],
  features: [
    'Hybrid renewable Simulink model',
    'ANN and SMC integration for power control',
    'Grid stability and response testing',
    'Complete project documentation and graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA56106',
  title: 'Power Management Scheme for Grid-Connected PV Integrated with Hybrid Energy Storage System',
  description: 'Proposes a power management system integrating PV with battery and supercapacitor storage to ensure smooth grid power and energy balance under dynamic loads.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'PV System', 'Hybrid Storage', 'Grid Integration', 'Energy Management'],
  features: [
    'Hybrid energy storage MATLAB model',
    'SOC-based energy management algorithm',
    'Grid voltage and current monitoring',
    'Simulation results and design documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA57107',
  title: 'Power Optimisation Scheme of Induction Motor Using Fuzzy Logic Controller for Electric Vehicle',
  description: 'Applies fuzzy logic control to improve the performance and power efficiency of an induction motor drive used in electric vehicles. MATLAB/Simulink used for control implementation.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'Fuzzy Logic', 'Induction Motor', 'EV Drive', 'Control System'],
  features: [
    'EV induction motor model with fuzzy control',
    'Speed and torque response analysis',
    'Efficiency comparison plots',
    'MATLAB scripts and detailed report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA58108',
  title: 'Power Quality Enhancement and Power Flow Analysis of a PV Integrated UPQC System in a Distribution Network',
  description: 'Analyzes the integration of a Unified Power Quality Conditioner (UPQC) with PV in a distribution grid for improved reactive power compensation and voltage regulation.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'UPQC', 'PV Integration', 'Power Quality', 'Distribution Network'],
  features: [
    'PV-integrated UPQC MATLAB model',
    'Reactive power and harmonic control',
    'Voltage regulation performance',
    'Simulation report and waveform graphs'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA59109',
  title: 'Power Quality Improvement in Grid Connected Distribution Systems Using Artificial Intelligence Based Controller',
  description: 'Implements an AI-driven control mechanism for harmonic mitigation and voltage stabilization in grid-connected distribution networks.',
  category: 'EEE',
  price: 5999,
  tags: ['MATLAB', 'AI Control', 'Power Quality', 'Grid', 'Neural Network'],
  features: [
    'AI-based control system MATLAB model',
    'Harmonic compensation simulation results',
    'Dynamic voltage regulation plots',
    'Documentation and test data'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA60110',
  title: 'Power Quality Improvement Using Dynamic Voltage Restorer',
  description: 'Design and simulation of a Dynamic Voltage Restorer (DVR) for mitigating voltage sag, swell, and harmonic disturbances in grid-connected systems.',
  category: 'EEE',
  price: 4899,
  tags: ['MATLAB', 'DVR', 'Voltage Sag', 'Power Quality', 'Grid Control'],
  features: [
    'DVR MATLAB/Simulink model',
    'Voltage compensation under disturbance',
    'THD and sag/swell test results',
    'Complete simulation report and files'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA61111',
  title: 'Power-Linked Predictive Control Strategy for Power Electronic Traction Transformer',
  description: 'Implements a power-linked predictive control scheme for traction transformers used in railway and EV applications to improve voltage regulation and transient response. Simulated using MATLAB/Simulink.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Traction Transformer', 'Predictive Control', 'Power Electronics'],
  features: [
    'Traction transformer Simulink model',
    'Predictive control algorithm implementation',
    'Dynamic response and error minimization plots',
    'Documentation and controller tuning data'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA62112',
  title: 'Protection of DC Bus Using Solid-State DC Breaker',
  description: 'Designs a fast solid-state DC circuit breaker for protection of DC bus systems. MATLAB model analyzes interruption speed, voltage overshoot, and current limiting characteristics.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'DC Breaker', 'Protection', 'Microgrid', 'Solid State'],
  features: [
    'Solid-state DC breaker Simulink setup',
    'Fault interruption and detection logic',
    'Transient voltage/current waveform plots',
    'Simulation report and hardware concept overview'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA63113',
  title: 'PSO Optimized PIDF Controller for Load-Frequency Control of A.C Multi-Islanded Microgrid System',
  description: 'Implements a Particle Swarm Optimization tuned PIDF controller for frequency regulation in multi-islanded AC microgrids, ensuring reduced overshoot and steady-state error.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'PSO', 'PIDF', 'Load Frequency Control', 'Microgrid'],
  features: [
    'Multi-islanded microgrid model in MATLAB',
    'PSO algorithm for PIDF tuning',
    'Frequency deviation and damping analysis',
    'Simulation results and documentation report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA64114',
  title: 'Quantitative Comparison and Analysis of Different Power Routing Methods for Single-Phase Cascaded H-Bridge Photovoltaic Grid-Connected Inverter',
  description: 'Compares multiple power routing methods in single-phase CHB PV inverters using MATLAB/Simulink, evaluating efficiency, harmonic distortion, and power-sharing performance.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'PV System', 'CHB Inverter', 'Power Routing', 'Grid Integration'],
  features: [
    'CHB inverter model with multiple routing logics',
    'THD and efficiency comparison graphs',
    'Power balance and grid current analysis',
    'Detailed results and technical documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA65115',
  title: 'Regenerative Braking of Electric Vehicle Using a Modified Direct Torque Control and Adaptive Control Theory',
  description: 'Develops a regenerative braking system for electric vehicles using modified DTC and adaptive control algorithms to recover kinetic energy efficiently in MATLAB/Simulink.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Regenerative Braking', 'Electric Vehicle', 'Adaptive Control', 'DTC'],
  features: [
    'EV drive with DTC-based braking model',
    'Regenerative energy recovery efficiency graphs',
    'Adaptive controller design and tuning',
    'Documentation and simulation plots'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA66116',
  title: 'Sensorless SynRG Based Variable Speed Wind Generator and Single-Stage Solar PV Array Integrated Grid System with Maximum Power Extraction Capability',
  description: 'Integrates a sensorless synchronous reluctance generator with a PV array for grid-connected operation. MATLAB/Simulink model ensures maximum power tracking and smooth synchronization.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Wind Generator', 'SynRG', 'PV Integration', 'Sensorless Control'],
  features: [
    'SynRG and PV hybrid system simulation',
    'Sensorless control algorithm design',
    'Grid-connected performance testing',
    'MPPT and synchronization analysis report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA67117',
  title: 'Single-Phase Boost DC-Link Integrated Cascaded Multilevel Inverter for PV Applications',
  description: 'Proposes a single-phase boost DC-link cascaded multilevel inverter to achieve high voltage gain and low harmonic distortion for PV applications.',
  category: 'EEE',
  price: 5499,
  tags: ['MATLAB', 'Boost Converter', 'Multilevel Inverter', 'Solar PV', 'Power Electronics'],
  features: [
    'Boost converter integrated multilevel inverter',
    'THD and efficiency evaluation',
    'PV power control algorithm in MATLAB',
    'Simulation and report documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA68118',
  title: 'Single-Phase Dual-Mode Interleaved Multilevel Inverter for PV Applications',
  description: 'Designs a dual-mode interleaved inverter for solar PV systems to improve harmonic performance and power conversion efficiency under variable loads.',
  category: 'EEE',
  price: 5199,
  tags: ['MATLAB', 'Dual Mode', 'Multilevel Inverter', 'PV System'],
  features: [
    'Interleaved inverter Simulink model',
    'Dual-mode control algorithm implementation',
    'THD comparison and efficiency plots',
    'Project report and control design explanation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA69119',
  title: 'Single-Stage PV-Grid Interactive Induction Motor Drive with Improved Flux Estimation Technique for Water Pumping with Reduced Sensors',
  description: 'Implements a single-stage PV grid-connected motor drive for water pumping applications using flux estimation with reduced sensors. Developed and tested in MATLAB.',
  category: 'EEE',
  price: 5599,
  tags: ['MATLAB', 'PV Drive', 'Induction Motor', 'Flux Estimation', 'Sensorless'],
  features: [
    'PV-fed single-stage motor drive model',
    'Flux estimation and sensorless control',
    'Pump performance and power analysis',
    'Simulation results and documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA70120',
  title: 'Solar PV Integration to E-Rickshaw With Regenerative Braking and Sensorless Control',
  description: 'Simulates a solar-powered e-rickshaw drive system with regenerative braking and sensorless motor control for efficient operation and extended battery life.',
  category: 'EEE',
  price: 4999,
  tags: ['MATLAB', 'E-Rickshaw', 'Solar PV', 'Regenerative Braking', 'Sensorless Drive'],
  features: [
    'Solar integrated e-rickshaw MATLAB model',
    'Regenerative braking algorithm design',
    'Sensorless control and motor efficiency plots',
    'Complete documentation and simulation data'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA71121',
  title: 'Trinary Hybrid Cascaded H-Bridge Multilevel Inverter-Based Grid-Connected Solar Power Transfer System Supporting Critical Load',
  description: 'Implements a trinary hybrid CHB multilevel inverter for solar power systems that ensures seamless power transfer to critical loads during grid interruptions. Simulated and verified in MATLAB/Simulink.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'CHB Inverter', 'Solar PV', 'Grid Connected', 'Critical Load'],
  features: [
    'Hybrid trinary CHB inverter simulation',
    'Critical load power transfer demonstration',
    'Grid synchronization and THD analysis',
    'Documentation and waveform plots'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA72122',
  title: 'Unbiased Circular Leakage Centered Adaptive Filtering Control for Power Quality Improvement of Wind-Solar PV Energy Conversion System',
  description: 'Designs an unbiased circular leakage adaptive filter to enhance power quality in hybrid wind-PV energy systems. MATLAB/Simulink used to analyze harmonics and reactive power compensation.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Adaptive Filtering', 'Wind Energy', 'Solar PV', 'Power Quality'],
  features: [
    'Hybrid wind-solar model with adaptive filter',
    'Harmonic and reactive power analysis',
    'Adaptive controller tuning plots',
    'Simulation graphs and final report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA73123',
  title: 'Unified Control Scheme of Grid-Connected Inverters for Autonomous and Smooth Transfer to Stand-Alone Mode',
  description: 'Implements a unified inverter control strategy to allow seamless transition between grid-connected and islanded operation in distributed generation systems.',
  category: 'EEE',
  price: 5699,
  tags: ['MATLAB', 'Inverter Control', 'Grid Connected', 'Islanded Mode', 'Distributed Generation'],
  features: [
    'Inverter MATLAB/Simulink model with unified control',
    'Grid-to-standalone smooth transition logic',
    'Dynamic performance and load sharing analysis',
    'Graphs and report documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA74124',
  title: 'UPQC Based Grid-Connected Photovoltaic System with Fuzzy Logic Controller',
  description: 'Develops a Unified Power Quality Conditioner integrated with solar PV using fuzzy logic control to improve voltage and current quality in a grid system.',
  category: 'EEE',
  price: 5499,
  tags: ['MATLAB', 'UPQC', 'Fuzzy Logic', 'PV System', 'Grid Quality'],
  features: [
    'UPQC-PV integrated MATLAB model',
    'Fuzzy logic control rule base design',
    'Power quality and harmonic compensation results',
    'Simulation data and full report'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA75125',
  title: 'Vehicle-To-Grid Technology in a Micro-Grid Using DC Fast Charging Architecture',
  description: 'Simulates a V2G-enabled DC fast charging architecture that supports bi-directional power exchange between EVs and a microgrid, improving load balance and grid stability.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'V2G', 'DC Fast Charging', 'Microgrid', 'Electric Vehicle'],
  features: [
    'DC fast charging MATLAB/Simulink model',
    'V2G power exchange and control logic',
    'Grid stability and efficiency analysis',
    'Graphs, data logs, and report documentation'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA76126',
  title: 'Virtual Inertia Emulator-Based Model Predictive Control for Grid Frequency Regulation Considering High Penetration of Inverter-Based Energy Storage System',
  description: 'Implements a virtual inertia emulator combined with model predictive control for grid frequency support in inverter-based systems. Simulated using MATLAB for transient and steady-state responses.',
  category: 'EEE',
  price: 5999,
  tags: ['MATLAB', 'Virtual Inertia', 'Predictive Control', 'Frequency Regulation', 'Energy Storage'],
  features: [
    'Virtual inertia control MATLAB model',
    'Predictive algorithm for frequency control',
    'Inverter-based energy storage response plots',
    'Technical report and simulation results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA77127',
  title: 'Voltage Sag Enhancement of Grid Connected Hybrid PV-Wind Power System Using Battery and SMES Based Dynamic Voltage Restorer',
  description: 'Designs a DVR using a combination of battery and superconducting magnetic energy storage (SMES) for mitigating voltage sags in hybrid PV-wind systems.',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'DVR', 'SMES', 'Hybrid PV-Wind', 'Voltage Sag'],
  features: [
    'Hybrid PV-wind MATLAB/Simulink system',
    'Battery-SMES DVR integration',
    'Voltage compensation and waveform plots',
    'Simulation report with control strategy details'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA78128',
  title: 'PV/WT Integrated System Using the Gray Wolf Optimization Technique for Power Quality Improvement',
  description: 'Applies the Gray Wolf Optimization algorithm to control a PV-wind hybrid system for improving power quality and reducing total harmonic distortion (THD).',
  category: 'EEE',
  price: 5799,
  tags: ['MATLAB', 'Gray Wolf Optimization', 'Hybrid System', 'Power Quality', 'THD'],
  features: [
    'Hybrid PV-wind MATLAB simulation',
    'GWO algorithm for controller optimization',
    'THD and efficiency improvement analysis',
    'Performance report and test results'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA79129',
  title: 'Multi-Winding Transformer Fed CHB Inverter with On-Line Switching Angle Calculation Based SHE Technique for Vector Controlled Induction Motor Drive',
  description: 'Implements a multi-winding transformer-fed cascaded H-bridge inverter using selective harmonic elimination (SHE) for precise control of induction motor drives.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'CHB Inverter', 'SHE', 'Induction Motor', 'Vector Control'],
  features: [
    'Multi-winding transformer-fed CHB model',
    'On-line switching angle optimization using SHE',
    'Vector control integration and waveform plots',
    'Simulation report and data analysis'
  ],
image: '/images/matlab.png'},
{
  id: 'PEEMA80130',
  title: 'Vector Controlled Induction Motor Drive Using PV Array with Adaptive DC-Link Control for Electric Vehicle Applications',
  description: 'Designs a PV-based vector-controlled induction motor drive with adaptive DC-link voltage control for EV applications to enhance performance and reliability.',
  category: 'EEE',
  price: 5899,
  tags: ['MATLAB', 'Induction Motor', 'Vector Control', 'DC-Link', 'Electric Vehicle'],
  features: [
    'PV-fed vector control drive MATLAB model',
    'Adaptive DC-link control implementation',
    'Torque-speed and voltage stability graphs',
    'Detailed documentation and report'
  ],
image: '/images/matlab.png'},
  {
    id: 'CSML101',
    title: 'Heart Disease Prediction using Machine Learning',
    description: 'A predictive ML project that analyzes patient health parameters to determine the likelihood of heart disease using Logistic Regression and Random Forest algorithms.',
    category: 'CSE',
    price: 3999,
    tags: ['Machine Learning', 'Healthcare', 'Classification', 'Python'],
    features: [
      'End-to-end Jupyter Notebook implementation',
      'Uses UCI Heart Disease dataset',
      'Algorithms: Logistic Regression, Random Forest, SVM',
      'Accuracy visualization and confusion matrix analysis',
      'Web app demo using Streamlit'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML102',
    title: 'Fake News Detection using Natural Language Processing',
    description: 'An NLP-based machine learning project that classifies news articles as real or fake using TF-IDF vectorization and Logistic Regression.',
    category: 'CSE',
    price: 3999,
    tags: ['NLP', 'Text Classification', 'Logistic Regression', 'Python'],
    features: [
      'Implements TF-IDF and CountVectorizer preprocessing',
      'Trains Logistic Regression and PassiveAggressive models',
      'Includes full confusion matrix and ROC curve plots',
      'Web app demo using Flask'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML103',
    title: 'Breast Cancer Classification using Support Vector Machine',
    description: 'An easy yet powerful ML project that classifies tumors as malignant or benign using Support Vector Machines on the Wisconsin dataset.',
    category: 'CSE',
    price: 3999,
    tags: ['Classification', 'SVM', 'Healthcare', 'Python'],
    features: [
      'Implements Support Vector Machine and Decision Tree',
      'Uses scikit-learn built-in Breast Cancer dataset',
      'Data visualization using Seaborn and Matplotlib',
      'Accuracy >95% with confusion matrix',
      'Streamlit GUI for real-time prediction'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML104',
    title: 'Student Performance Prediction using Regression Models',
    description: 'A simple regression-based ML project that predicts student grades using study hours, attendance, and past performance data.',
    category: 'CSE',
    price: 3999,
    tags: ['Regression', 'Prediction', 'Python', 'Education'],
    features: [
      'Dataset preprocessing using Pandas and NumPy',
      'Multiple Linear Regression and Random Forest Regressor',
      'R² score and MSE evaluation metrics',
      'Data visualization with Plotly'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML105',
    title: 'Plant Disease Detection using Convolutional Neural Networks',
    description: 'A deep learning project that classifies plant leaf images into healthy or diseased categories using CNN architecture trained on PlantVillage dataset.',
    category: 'CSE',
    price: 3999,
    tags: ['Deep Learning', 'CNN', 'Image Classification', 'TensorFlow'],
    features: [
      'Implements CNN using TensorFlow and Keras',
      'Model training notebook included',
      'Real-time disease detection with webcam integration',
      'Web app demo using Streamlit'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML106',
    title: 'AI-Powered Health Risk Dashboard',
    description: 'An interactive Streamlit web app that predicts heart disease, diabetes, and obesity risk using multiple ML models with visual dashboards.',
    category: 'CSE',
    price: 3999,
    tags: ['Machine Learning', 'Streamlit', 'Healthcare', 'Visualization'],
    features: [
      'Multi-condition prediction (heart, diabetes, obesity)',
      'Sliders for user health inputs (BMI, BP, glucose)',
      'Live charts and probability gauges',
      'Model comparison: Logistic Regression vs Random Forest',
      'Deployed Streamlit UI with animated results'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML107',
    title: 'Fake News Detection Web App',
    description: 'A Flask-based NLP web application that detects whether news headlines are fake or real in real time.',
    category: 'CSE',
    price: 3999,
    tags: ['NLP', 'Flask', 'Text Classification', 'Python'],
    features: [
      'Text input box with live classification result',
      'TF-IDF + Logistic Regression backend',
      'Stylish Bootstrap dashboard UI',
      'Displays word importance visualization',
      'Heroku-ready Flask deployment'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML108',
    title: 'Plant Disease Detection Dashboard',
    description: 'A CNN-powered Streamlit interface that allows users to upload plant leaf photos and get instant disease classification with explanation.',
    category: 'CSE',
    price: 3999,
    tags: ['CNN', 'TensorFlow', 'Streamlit', 'Computer Vision'],
    features: [
      'Upload image feature with real-time preview',
      'Grad-CAM heatmap overlay for diseased regions',
      'Beautiful result cards for each class',
      'Built with TensorFlow + Keras + OpenCV',
      'Responsive UI layout and dark mode theme'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML109',
    title: 'Student Performance Predictor with Charts',
    description: 'A regression-based Streamlit dashboard predicting final grades and visualizing study patterns and outcomes.',
    category: 'CSE',
    price: 3999,
    tags: ['Regression', 'Streamlit', 'Visualization', 'Python'],
    features: [
      'Interactive sliders for attendance, study hours',
      'Bar and line charts for predicted scores',
      'Dynamic R² and MSE visualization',
      'CSV upload support for batch prediction'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML110',
    title: 'Cervical Cancer Detection using Deep Learning',
    description: 'A healthcare AI web app for classifying cervical images into normal and precancerous categories using EfficientNet-B0.',
    category: 'CSE',
    price: 3999,
    tags: ['Healthcare', 'CNN', 'Streamlit', 'Explainable AI'],
    features: [
      'Upload cervix images with real-time predictions',
      'CLAHE + Gabor preprocessing visualization',
      'Explainable Grad-CAM overlay',
      'AI diagnosis + confidence scores',
      'Streamlit dashboard with tabbed layout'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML111',
    title: 'Speech Emotion Detector Web Interface',
    description: 'A Flask + JS web app that records user voice and detects emotion using LSTM-based audio model.',
    category: 'CSE',
    price: 3999,
    tags: ['Speech', 'Flask', 'Audio Processing', 'Deep Learning'],
    features: [
      'Voice recording directly from browser',
      'Spectrogram visualization',
      'MFCC feature extraction display',
      'Interactive UI built with HTML + Bootstrap'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML112',
    title: 'AI Resume Analyzer & Job Match Portal',
    description: 'A Streamlit-based AI system that parses resumes, extracts key skills, and matches with job descriptions using NLP.',
    category: 'CSE',
    price: 3999,
    tags: ['NLP', 'Streamlit', 'Text Analysis', 'Python'],
    features: [
      'Upload resume (PDF/DOCX)',
      'Skill extraction using spaCy + BERT embeddings',
      'Similarity score against job description',
      'Interactive bar chart for skill gap analysis'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML113',
    title: 'Credit Card Fraud Detection Dashboard',
    description: 'A fraud detection visualization dashboard that allows uploading transaction CSVs and visualizing anomalies using PCA and Random Forest.',
    category: 'CSE',
    price: 3999,
    tags: ['Anomaly Detection', 'Finance', 'Streamlit', 'Python'],
    features: [
      'Upload CSV to detect frauds live',
      'PCA scatter plot for fraud visualization',
      'Algorithm comparison chart',
      'Interactive confusion matrix and ROC curves'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML114',
    title: 'Emotion Detection from Text Web App',
    description: 'A React + Flask based web app that classifies text into emotional categories like joy, anger, or sadness.',
    category: 'CSE',
    price: 3999,
    tags: ['NLP', 'Flask', 'React', 'Text Classification'],
    features: [
      'Real-time text classification via REST API',
      'Frontend built in React with animations',
      'LSTM model backend with Flask API',
      'Displays emojis and emotion graphs dynamically'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML115',
    title: 'Face Mask Detection App',
    description: 'A real-time mask detection app built using OpenCV and TensorFlow with live webcam feed integration.',
    category: 'CSE',
    price: 3999,
    tags: ['CNN', 'OpenCV', 'Streamlit', 'Image Detection'],
    features: [
      'Live webcam detection of mask vs no mask',
      'Real-time bounding boxes and label overlay',
      'TensorFlow Lite optimization for faster inference',
      'Streamlit UI with camera toggle'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML116',
    title: 'COVID-19 Data Visualization and Forecasting Dashboard',
    description: 'A time-series forecasting dashboard showing daily COVID-19 trends and predictions using ARIMA and LSTM.',
    category: 'CSE',
    price: 3999,
    tags: ['Time Series', 'Streamlit', 'Forecasting', 'Visualization'],
    features: [
      'Global dataset with auto-update',
      'Trend, growth, and forecast charts',
      'Switch between ARIMA and LSTM',
      'Dynamic matplotlib + Plotly visualization'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML117',
    title: 'Brain Tumor Detection Interactive UI',
    description: 'A medical imaging web app using CNN to detect brain tumors from MRI images with clear UI visualization.',
    category: 'CSE',
    price: 3999,
    tags: ['CNN', 'TensorFlow', 'Streamlit', 'Explainable AI'],
    features: [
      'Upload MRI image and visualize Grad-CAM output',
      'Confidence bars for each tumor class',
      'Histogram and segmentation mask overlay',
      'Streamlit UI with multiple tabs'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML118',
    title: 'House Price Predictor with Interactive Maps',
    description: 'A Flask + Leaflet.js app that predicts house prices based on input location and displays results on a live map.',
    category: 'CSE',
    price: 3999,
    tags: ['Regression', 'Flask', 'Map Visualization', 'Python'],
    features: [
      'Google Maps-style UI integration',
      'Linear Regression backend model',
      'Real-time map marker updates with predicted prices',
      'Beautiful UI with Bootstrap and JS interactivity'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML119',
    title: 'AI Chatbot using NLP and Streamlit',
    description: 'A conversational AI chatbot built using transformer models (DistilBERT) and deployed in Streamlit.',
    category: 'CSE',
    price: 3999,
    tags: ['Chatbot', 'Transformers', 'Streamlit', 'NLP'],
    features: [
      'Interactive chat interface with avatars',
      'Backend NLP using Hugging Face Transformers',
      'Response time optimization with caching',
      'Export chat logs as text files'
    ],
    image: '/images/cse.png'
  },
  {
    id: 'CSML120',
    title: 'AI Traffic Sign Recognition Web App',
    description: 'An interactive CNN-based web app that classifies uploaded traffic signs using deep learning and displays label confidence.',
    category: 'CSE',
    price: 3999,
    tags: ['CNN', 'Computer Vision', 'Streamlit', 'Python'],
    features: [
      'Upload and preview sign images',
      'Confidence score chart visualization',
      'Trained on German Traffic Sign dataset',
      'Responsive and attractive Streamlit interface'
    ],
    image: '/images/cse.png'
  }
];
