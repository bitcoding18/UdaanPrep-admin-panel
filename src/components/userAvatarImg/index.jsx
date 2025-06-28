const UserAvatarImgComponent = (props) => {
  return ( 
    <div className={`userImg ${props.lg ? 'lg' : ''}`}>
      <span className="rounded-circle">
        <img src={props.img} />
      </span>
    </div>
  );
};

export default UserAvatarImgComponent;
