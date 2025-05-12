import { Card, Col, Row } from "antd";

export default function CategoryPill() {
  return (
    <div
      style={{
        marginBottom: "16px",
        backgroundColor: "White",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              height: 120,
              background:
                "linear-gradient(325deg,rgba(81, 162, 255, 1) 0%, rgba(21, 93, 252, 1) 75%)",
            }}
            variant="borderless"
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                color: "white",
              }}
            >
              {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ECFDF5",
                    borderRadius: "50%",
                  }}
                >
                  <Users color="#047857" size={24} />
                </div> */}
              <div>
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: "600",
                  }}
                >
                  100
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Active Student
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              background:
                "linear-gradient(325deg,rgba(255, 185, 0, 1) 0%, rgba(225, 113, 0, 1) 75%)",
            }}
            variant="borderless"
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                color: "white",
              }}
            >
              {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ECFDF5",
                    borderRadius: "50%",
                  }}
                >
                  <Users color="#047857" size={24} />
                </div> */}
              <div>
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: "600",
                  }}
                >
                  100
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Active Student
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              background:
                "linear-gradient(325deg,rgba(237, 106, 255, 1) 0%, rgba(200, 0, 222, 1) 75%)",
            }}
            variant="borderless"
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                color: "white",
              }}
            >
              {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ECFDF5",
                    borderRadius: "50%",
                  }}
                >
                  <Users color="#047857" size={24} />
                </div> */}
              <div>
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: "600",
                  }}
                >
                  100
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Active Student
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              background:
                "linear-gradient(325deg,rgba(70, 236, 213, 1) 0%, rgba(0, 150, 137, 1) 100%)",
            }}
            variant="borderless"
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                color: "white",
              }}
            >
              {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ECFDF5",
                    borderRadius: "50%",
                  }}
                >
                  <Users color="#047857" size={24} />
                </div> */}
              <div>
                <p
                  style={{
                    fontSize: "34px",
                    fontWeight: "600",
                  }}
                >
                  100
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Active Student
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
