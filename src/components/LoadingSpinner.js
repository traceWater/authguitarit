import React from 'react';
import {FaSpinner} from '../../node_modules/react-icons/fa';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles['loading-spinner']}>
        <FaSpinner />
    </div>
  )
}

export default LoadingSpinner