import React from 'react';
import formatJSON from 'format-json';
import SessionStyles from './Session.css';
import { Card, Button, Alert, Tooltip } from 'antd';
import { getCapsObject } from '../../actions/Session.js';
import { CloseOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import { ALERT } from '../AntdTypes';

const FormattedCaps = (props) => {
  const { caps, title, desiredCapsName, isEditingDesiredCapsName,
          isEditingDesiredCaps, startDesiredCapsEditor, abortDesiredCapsEditor,
          saveRawDesiredCaps, setRawDesiredCaps, rawDesiredCaps,
          isValidCapsJson, invalidCapsJsonReason, t } = props;

  const setCapsTitle = () => {
    const { setDesiredCapsName } = props;
    if (!title) {
      return 'JSON Representation';
    } else if (!isEditingDesiredCapsName) {
      return title;
    } else {
      return <input
        onChange={(e) => setDesiredCapsName(e.target.value)}
        value={desiredCapsName}
        className={SessionStyles.capsEditorTitle}
      />;
    }
  };

  const setCapsTitleButtons = () => {
    const { startDesiredCapsNameEditor, abortDesiredCapsNameEditor, saveDesiredCapsName } = props;
    if (!title) {
      return null;
    } else if (!isEditingDesiredCapsName) {
      return <Tooltip title={t('Edit')}>
        <Button
          size='small'
          onClick={startDesiredCapsNameEditor}
          icon={<EditOutlined/>}
          className={SessionStyles.capsNameEditorButton}/>
      </Tooltip>;
    } else {
      return <div><Tooltip title={t('Cancel')}>
        <Button
          size='small'
          onClick={abortDesiredCapsNameEditor}
          icon={<CloseOutlined/>}
          className={SessionStyles.capsNameEditorButton} />
      </Tooltip>
      <Tooltip title={t('Save')}>
        <Button
          size='small'
          onClick={saveDesiredCapsName}
          icon={<SaveOutlined/>}
          className={SessionStyles.capsNameEditorButton} />
      </Tooltip></div>;
    }
  };

  return caps && <Card
    className={SessionStyles.formattedCaps}
    title={setCapsTitle()}
    extra={setCapsTitleButtons()}
  >
    <div className={SessionStyles.capsEditorControls}>
      {isEditingDesiredCaps && <Tooltip title={t('Cancel')}>
        <Button
          onClick={abortDesiredCapsEditor}
          icon={<CloseOutlined/>}
          className={SessionStyles.capsEditorButton} />
      </Tooltip> }
      {isEditingDesiredCaps && <Tooltip title={t('Save')}>
        <Button
          onClick={saveRawDesiredCaps}
          icon={<SaveOutlined/>}
          className={SessionStyles.capsEditorButton} />
      </Tooltip>}
      {!isEditingDesiredCaps && <Tooltip title={t('Edit Raw JSON')} placement="topRight" >
        <Button
          onClick={startDesiredCapsEditor}
          icon={<EditOutlined/>} />
      </Tooltip> }
    </div>
    {isEditingDesiredCaps && <div className={SessionStyles.capsEditor}>
      <textarea onChange={(e) => setRawDesiredCaps(e.target.value)} value={rawDesiredCaps}
        className={`${SessionStyles.capsEditorBody} ${isValidCapsJson ? SessionStyles.capsEditorBodyFull : SessionStyles.capsEditorBodyResized}`}
      />
      {!isValidCapsJson && <Alert message={invalidCapsJsonReason} type={ALERT.ERROR} />}
    </div>}
    {!isEditingDesiredCaps && <div className={SessionStyles.formattedCapsBody}>
      <pre>{formatJSON.plain(getCapsObject(caps))}</pre>
    </div>}
  </Card>;
};

export default FormattedCaps;
