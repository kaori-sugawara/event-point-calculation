import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { InputNumber } from './components/InputNumber'
import { LabelText } from './components/labelText';
import { SelectBox } from './components/SelectBox';
import { Error } from './components/Error';
import { IFormInput, schema, defaultValues } from './validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';

function App() {
  const { errors, control } = useForm<IFormInput>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues
  });
  const watchStar3 = useWatch({ name: "star3", defaultValue: 0, control });
  const watchStar4 = useWatch({ name: "star4", defaultValue: 0, control });
  const watchStar5 = useWatch({ name: "star5", defaultValue: 0, control });
  const watchLiveScore = useWatch({ name: "liveScore", defaultValue: 210, control });
  const watchEventLiveScore = useWatch({ name: "eventLiveScore", defaultValue: 210, control });
  const watchGoal = useWatch({ name: "goal", defaultValue: 350, control });
  const watchBpPerPlay = useWatch({ name: "bpPerPlay", defaultValue: 10, control });

  const star3cardItems = React.useMemo(() => {
    const list = [];
    for (let i = 0; i <= 10; i++) {
      list.push({ label: i.toString(), value: i });
    }
    return list;
  }, []);
  const star4cardItems = [
    { label: "0", value: 0 },
    { label: "1", value: 5 },
    { label: "2", value: 15 },
    { label: "3", value: 25 },
    { label: "4", value: 35 },
    { label: "5", value: 50 },
  ];
  const star5cardItems = [
    { label: "0", value: 0 },
    { label: "1", value: 20 },
    { label: "2", value: 50 },
    { label: "3", value: 75 },
    { label: "4", value: 100 },
    { label: "5", value: 150 },
  ];
  const goalCard = [
    { label: "1", value: 350 },
    { label: "2", value: 750 },
    { label: "3", value: 1100 },
    { label: "4", value: 1150 },
    { label: "5", value: 2200 },
  ]
  const useBp = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "6", value: 6 },
    { label: "10", value: 10 },
  ];
  const totalPoint = React.useMemo(() => {
    const eventCordBonus = (watchStar3 + watchStar4 + watchStar5) / 100 + 1;
    const scoreBonus = Math.round(watchLiveScore * 10000 / 5000);
    const eventScoreBonus = Math.round(watchEventLiveScore * 10000 / 5000);
    const getEventPoint = (10000 + eventScoreBonus) * eventCordBonus;
    const getNomalPoint = (2000 + scoreBonus) * eventCordBonus;
    return getNomalPoint + Math.round(getEventPoint / 10);
  }, [watchStar3, watchStar4, watchStar5, watchLiveScore, watchEventLiveScore])

  const requiredBp = React.useMemo(() => {
    return Math.round(watchGoal * 10000 / totalPoint);
  }, [watchGoal, totalPoint]);
  const requiredPlay = React.useMemo(() => {
    return Math.round(requiredBp / watchBpPerPlay);
  }, [requiredBp, watchBpPerPlay]);
  const requiredTime = React.useMemo(() => {
    const time = requiredPlay * 3;
    const hour = Math.floor(time / 60);
    const min = time % 60;
    return { hour, min };
  }, [requiredPlay]);
  const requiredStone = React.useMemo(() => {
    return (requiredBp - 472) * 2;
  }, [requiredBp]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          あんスタ！！イベント計算シート
        </p>
      </header>
      <main>
        <div className="container">
          <div className="mt-5">
            <div className="field is-horizontal">
              <div className="field-label is-normal" style={{ flexGrow: 5 }}>
                <label className="label">特攻カード枚数</label>
              </div>
              <div className="field-body"></div>
            </div>
            <SelectBox
              name="star3"
              label="星3"
              items={star3cardItems}
              unit="枚"
              control={control}
            />
            {errors.star3 && (
              <Error error={errors.star3.message ?? ''} />
            )}
            <SelectBox
              name="star4"
              label="星4"
              items={star4cardItems}
              unit="枚"
              control={control}
            />
            {errors.star4 && (
              <Error error={errors.star4.message ?? ''} />
            )}
            <SelectBox
              name="star5"
              label="星5"
              items={star5cardItems}
              unit="枚"
              control={control}
            />
            {errors.star5 && (
              <Error error={errors.star5.message ?? ''} />
            )}
          </div>

          <div className="mt-5">
            <SelectBox
              name="goal"
              label="目標枚数"
              items={goalCard}
              unit="枚"
              control={control}
            />
            {errors.goal && (
              <Error error={errors.goal.message ?? ''} />
            )}
          </div>

          <div className="mt-5">
            <InputNumber
              name="liveScore"
              label="通常ライブSCORE"
              min={0} unit="万pt"
              control={control} />
            {errors.liveScore && (
              <Error error={errors.liveScore.message ?? ''} />
            )}
          </div>

          <div className="mt-5">
            <InputNumber
              name="eventLiveScore"
              label="イベントライブSCORE"
              min={0}
              unit="万pt"
              control={control} />
            {errors.eventLiveScore && (
              <Error error={errors.eventLiveScore.message ?? ''} />
            )}
          </div>

          <div className="mt-5">
            <SelectBox
              name="bpPerPlay"
              label="1play毎の消費BP"
              items={useBp}
              control={control}
            />
            {errors.bpPerPlay && (
              <Error error={errors.bpPerPlay.message ?? ''} />
            )}
          </div>

          <LabelText label="必要ライブ回数" value={requiredPlay ?? 0} unit="回" />
          <LabelText label="必要ダイヤ数" value={requiredStone ?? 0} unit="個" />
          <div className="mt-5">
            <div className="field is-horizontal">
              <div className="field-label is-normal" style={{ flexGrow: 5 }}>
                <label className="label">必要プレイ時間</label>
              </div>
              <div className="field-body">
                <div className="field" style={{ paddingTop: ".375rem" }}>
                  <span>{requiredTime.hour ?? 0} 時間 {requiredTime.min} 分</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="m-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div>
              <a
                className="Twitter-link"
                href="https://twitter.com/kikan_zyuuu/status/1315542522140131328?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                素晴らしい参照元ツイート
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
