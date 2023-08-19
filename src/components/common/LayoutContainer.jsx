export default function LayoutContainer({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '390px',
        margin: '0 auto',
        justifyContent: 'center',
        fontFamily: 'BMHANNAPro',
      }}
    >
      {children}
    </div>
  );
}
