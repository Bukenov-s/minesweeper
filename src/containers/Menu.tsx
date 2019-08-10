import React, { FC } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

interface IProps {

}

const Menu: FC<{}> = () => {
  return (
    <h1>Menu</h1>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
