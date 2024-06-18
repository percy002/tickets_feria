import React, { useEffect, useState } from "react";
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
import QRCode from "qrcode";

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
  qr:{
    width: "50%",
  }
});

interface Props {
  userData: User | null;
  tickets: number;
  tipoTicket: string;
  qr: string;
}
// Create Document Component
const TicketPDF = ({ userData, tickets, tipoTicket, qr }: Props) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  useEffect(() => {
    if (!qr) return;
    QRCode.toDataURL(qr)
      .then((url: any) => {
        setQrCode(url);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [qr]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image
              src={"images/logos/logo_expoferia_2024.png"}
              style={styles.logo}
            />
            <View style={styles.qr}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              {qrCode && <Image src={qrCode} />}
            </View>
            <Text>{`Cantidad ${tickets} Entradas`}</Text>
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
              <Text>
                {userData?.apellido_paterno} {userData?.apellido_materno}
              </Text>
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
              {tipoTicket == "1" ? (
                <Text>S/. 10.00</Text>
              ) : (
                <Text>S/. 30.00</Text>
              )}
            </View>
            <View>
              <Text>Cantidad</Text>
              <Text style={styles.textRight}>{tickets}</Text>
            </View>
            <View>
              <Text>Importe</Text>
              {tipoTicket == "1" ? (
                <Text style={styles.textRight}>S/. {tickets * 10}.00</Text>
              ) : (
                <Text style={styles.textRight}>S/. {tickets * 30}.00</Text>
              )}
              {/* <Text style={styles.textRight}>S/. {tickets * 10}.00</Text> */}
            </View>
          </View>
          <View>
            <Text style={styles.textRight}>
              Total :S/. {tipoTicket == "1" ? 10 * tickets : 30 * tickets}.00
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TicketPDF;
