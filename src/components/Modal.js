import React from 'react';

const Modal = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    marginTop: 50,
                    width: 300,
                    height: 300,
                    border: "2px solid black"
                }}
            >
            <input type="text" />
            <br />
            <input type="text" />
            <br />
            <input type="text" />
            <br />
            <input type="text" />
            <br />
                {/* <div
                    style={{
                        width: "30%",
                        textAlign: "center",
                        borderRadius: 30,
                        background: "grey",
                        fontSize: 20,
                        color: "white",
                    }}
                >
                </div> */}
            </div>
        </div>
    )
};

export default Modal;