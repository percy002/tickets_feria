import React from "react";
import { User } from "@/contexts/AuthContext";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  GlobalStateProvider,
  UserData,
  useGlobalState,
} from "@/contexts/GlobalStateContext";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: 10,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    marginRight: 20,
  },
  section: {
    marginTop: 10,
    padding: 10,
    width: "50%",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
  dataUser: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBold: {
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "right",
  },
  halfPage: {
    width: "50%",
  },
});

interface Props {
  userData: User|null;
  generalTickets: number;
  startTickets: number;
}
// Create Document Component
const TicketPDF = ({ userData, generalTickets, startTickets }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <Image
            src={"images/logos/logo_expoferia_2024.png"}
            style={styles.logo}
          />
          <Image src={"images/QR.jpg"} style={styles.logo} />
          <Text>{`Cantidad ${generalTickets} Entradas`}</Text>
          <View style={styles.description}>
            <Text>10/05/2024 10:00 pm</Text>
            <Text>Expo Cusco 2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textBold}>Comprador</Text>
        <View style={styles.dataUser}>
          <View>
            <Text style={styles.textBold}>Nombres</Text>
            <Text>{userData?.nombres}</Text>
          </View>
          <View>
            <Text style={styles.textBold}>Apellidos</Text>
            <Text>{userData?.apellido_paterno} {userData?.apellido_materno}</Text>
          </View>
          <View>
            <Text style={styles.textBold}>Dni</Text>
            <Text>{userData?.dni}</Text>
          </View>
        </View>
        <View style={styles.dataUser}>
          <View>
            <Text style={styles.textBold}>Celular</Text>
            <Text>{userData?.celular}</Text>
          </View>
          <View>
            <Text style={styles.textBold}>Correo Electrónico</Text>
            <Text>{userData?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.textBold}>Entradas</Text>
        <View style={styles.dataUser}>
          <View>
            <Text>Descripción</Text>
            <Text>entrada-general</Text>
          </View>
          <View>
            <Text>Precio unitario</Text>
            <Text>S/. 10.00</Text>
          </View>
          <View>
            <Text>Cantidad</Text>
            <Text style={styles.textRight}>{generalTickets}</Text>
          </View>
          <View>
            <Text>Importe</Text>
            <Text style={styles.textRight}>S/. {generalTickets * 10}.00</Text>
          </View>
        </View>
        <View>
          <Text>Total :S/. {generalTickets * 10}.00</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;
