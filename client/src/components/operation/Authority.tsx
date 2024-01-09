Skip to content
GitLab
Menu
Search GitLab
1
Help
최연동
C
contentbank-user
Project information
Repository
Files
Commits
Branches
Tags
Contributors
Graph
Compare
Issues
0
Merge requests
0
CI/CD
Security & Compliance
Deployments
Monitor
Infrastructure
Packages & Registries
Analytics
Wiki
Snippets
Settings
Collapse sidebar
ContentBankFE
contentbank-user
Repository
dev
contentbank-user
client
src
components
operation
Authority.tsx
김효선's avatar
네비 학습지 링크추가
김효선 authored 14 hours ago
e5047c9c
 Authority.tsx  31.6 KB
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
937
938
939
940
941
942
943
944
945
946
947
948
949
950
951
952
953
954
955
956
957
958
959
960
961
962
963
964
965
966
967
968
969
970
971
972
973
974
975
976
977
978
979
980
981
982
983
984
985
986
987
988
989
990
991
992
993
994
995
996
997
998
999
1000
1001
1002
1003
1004
1005
1006
1007
1008
1009
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { DeleteAuthority } from '../../api/deleteAxios';
import { getAuthorityList, getMemberAuthority } from '../../api/getAxios';
import { postCreateAuthority } from '../../api/postAxios';
import { Input } from '../../components';
import { Button, IndexInfo } from '../../components/atom';
// import {
//   editCreateContentBool,
//   editCreateListBool,
//   editCreateContentWorksheetBool,
//   editManagementContentBool,
//   editManagementListBool,
//   editManagementTreeBool,
//   editOperationBoolAtom,
//   editMemberBoolAtom,
//   editAuthorityBoolAtom,
//   manageCreateContentBoolAtom,
//   manageCreateListBoolAtom,
//   manageCreateContentWorksheetBoolAtom,
//   manageManagementContentBoolAtom,
//   manageManagementListBoolAtom,
//   manageManagementTreeBoolAtom,
//   manageOperationBoolAtom,
//   manageMemberBoolAtom,
//   manageAuthorityBoolAtom,
// } from '../../store/authorityAtom';
import { alertBoolAtom } from '../../store/utilAtom';
import { COLOR } from '../constants';
import { Alert } from '../molecules/alert/Alert';
type AuthorityListProps = {
  seq: number;
  code: string;
  name: string;
  sort: number;
};
export const defaultPermissions = [
  { key: 'isEditCreateChecked', checked: false },
  { key: 'isManageCreateChecked', checked: false },
  { key: 'isEditCreateListChecked', checked: false },
  { key: 'isManageCreateListChecked', checked: false },
  { key: 'isEditWorksheetChecked', checked: false },
  { key: 'isManageWorksheetChecked', checked: false },
  { key: 'isEditManagementChecked', checked: false },
  { key: 'isManageManagementChecked', checked: false },
  { key: 'isEditManagementListChecked', checked: false },
  { key: 'isManageManagementListChecked', checked: false },
  { key: 'isEditTreeChecked', checked: false },
  { key: 'isManageTreeChecked', checked: false },
  { key: 'isEditOperationChecked', checked: false },
  { key: 'isManageOperationChecked', checked: false },
  { key: 'isEditMemberChecked', checked: false },
  { key: 'isManageMemberChecked', checked: false },
  { key: 'isEditAuthorityChecked', checked: false },
  { key: 'isManageAuthorityChecked', checked: false },
];
export function Authority() {
  const [authorityList, setAuthorityList] = useState<AuthorityListProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isClickedName, setIsClickedName] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);
  const [isPutAuthority, setIsPutAuthority] = useState(false);
  const [isUpdateAuthority, setIsUpdateAuthority] = useState(false);
  const [isCreateNameError, setIsCreateNameError] = useState(false);
  const [isPutNameError, setIsPutNameError] = useState(false);
  const [isDeleteAuthority, setIsDeleteAuthority] = useState(false);
  const [didMount, setDidMount] = useState(false);
  // const [checkList, setCheckList] = useState(defaultPermissions);
  const [checkList, setCheckList] = useState<
    {
      key: string;
      checked: boolean;
    }[]
  >(defaultPermissions);
  const openUpdateAlert = () => {
    setIsAlertOpen(true);
    if (inputValue === '') {
      setIsCreateNameError(true);
      setIsUpdateAuthority(false);
    }
    if (inputValue) {
      setIsCreateNameError(false);
      setIsUpdateAuthority(true);
    }
  };
  // const clickMemberAuthority = (code: string) => {
  //   getMemberAuthority(
  //     {
  //       setIsEditCreateChecked,
  //       setIsManageCreateChecked,
  //       setIsEditCreateListChecked,
  //       setIsManageCreateListChecked,
  //       setIsEditWorksheetChecked,
  //       setIsManageWorksheetChecked,
  //       setIsEditManagementChecked,
  //       setIsManageManagementChecked,
  //       setIsEditManagementListChecked,
  //       setIsManageManagementListChecked,
  //       setIsEditTreeChecked,
  //       setIsManageTreeChecked,
  //       setIsEditOperationChecked,
  //       setIsManageOperationChecked,
  //       setIsEditMemberChecked,
  //       setIsManageMemberChecked,
  //       setIsEditAuthorityChecked,
  //       setIsManageAuthorityChecked,
  //     },
  //     code,
  //   );
  // };
  // 신규 권한 생성
  const submitAuthority = () => {
    // const isEditCreateChecked = checkList[0].checked; //전체
    // const isManageCreateChecked = checkList[1].checked;
    const isEditCreateListChecked = checkList[2].checked;
    const isManageCreateListChecked = checkList[3].checked;
    const isEditWorksheetChecked = checkList[4].checked;
    const isManageWorksheetChecked = checkList[5].checked;
    // const isEditManagementChecked = checkList[6].checked;
    // const isManageManagementChecked = checkList[7].checked;
    const isEditManagementListChecked = checkList[8].checked;
    const isManageManagementListChecked = checkList[9].checked;
    const isEditTreeChecked = checkList[10].checked;
    const isManageTreeChecked = checkList[11].checked;
    // const isEditOperationChecked = checkList[12].checked;
    // const isManageOperationChecked = checkList[13].checked;
    const isEditMemberChecked = checkList[14].checked;
    const isManageMemberChecked = checkList[15].checked;
    const isEditAuthorityChecked = checkList[16].checked;
    const isManageAuthorityChecked = checkList[17].checked;
    postCreateAuthority({
      inputValue,
      isEditCreateListChecked,
      isManageCreateListChecked,
      isEditWorksheetChecked,
      isManageWorksheetChecked,
      isEditManagementListChecked,
      isManageManagementListChecked,
      isEditTreeChecked,
      isManageTreeChecked,
      isEditMemberChecked,
      isManageMemberChecked,
      isEditAuthorityChecked,
      isManageAuthorityChecked,
    });
    setIsAlertOpen(false);
  };
  // 권한관리 체크박스 핸들러
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스 선택시 해당 배열값변경
    const onList = checkList;
    const target = e.currentTarget;
    console.log(target.id, target.checked, target.value);
    // 개당 체크시 체크 토글
    onList.splice(Number(target.value), 1, {
      key: target.id,
      checked: target.checked,
    });
    setCheckList([...onList]);
    //콘텐츠 제작
    // [0] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditCreateChecked') {
      if (target.checked === true) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: true,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: true,
        });
        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(2, 1, {
          key: checkList[2].key,
          checked: false,
        });
        onList.splice(4, 1, {
          key: checkList[4].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [2][4] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 2 || Number(target.value) === 4) {
      if (target.checked === false) {
        onList.splice(0, 1, {
          key: target.id,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(1, 1, {
          key: checkList[1].key,
          checked: false,
        });
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      if (checkList[2].checked && checkList[4].checked) {
        onList.splice(0, 1, {
          key: target.id,
          checked: true,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [1][3][5] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 1 ||
      Number(target.value) === 3 ||
      Number(target.value) === 5
    ) {
      if (Number(target.value) === 1 && target.checked === true) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: true,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 1 && target.checked === false) {
        onList.splice(3, 1, {
          key: checkList[3].key,
          checked: false,
        });
        onList.splice(5, 1, {
          key: checkList[5].key,
          checked: false,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 3 || Number(target.value) === 5) {
        if (target.checked === false) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: false,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[3].checked && checkList[5].checked) {
          onList.splice(1, 1, {
            key: checkList[1].key,
            checked: true,
          });
          setCheckList([...onList]);
          return;
        }
      }
    }
    //콘텐츠 관리
    // [6] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditManagementChecked') {
      if (target.checked === true) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: true,
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: true,
        });
        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(8, 1, {
          key: checkList[8].key,
          checked: false,
        });
        onList.splice(10, 1, {
          key: checkList[10].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [8][10] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 8 || Number(target.value) === 10) {
      if (target.checked === false) {
        onList.splice(6, 1, {
          key: target.id,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(7, 1, {
          key: checkList[7].key,
          checked: false,
        });
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      if (checkList[8].checked && checkList[10].checked) {
        onList.splice(6, 1, {
          key: target.id,
          checked: true,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [7][9][11] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 7 ||
      Number(target.value) === 9 ||
      Number(target.value) === 11
    ) {
      if (Number(target.value) === 7 && target.checked === true) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: true,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 7 && target.checked === false) {
        onList.splice(9, 1, {
          key: checkList[9].key,
          checked: false,
        });
        onList.splice(11, 1, {
          key: checkList[11].key,
          checked: false,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 9 || Number(target.value) === 11) {
        if (target.checked === false) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: false,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[9].checked && checkList[11].checked) {
          onList.splice(7, 1, {
            key: checkList[7].key,
            checked: true,
          });
          setCheckList([...onList]);
          return;
        }
      }
    }
    //운영 관리
    // [12] 편집 전체 선택 토글 // 편집 선택false시 관리 체크 초기화
    if (target.id === 'isEditOperationChecked') {
      if (target.checked === true) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: true,
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: true,
        });
        setCheckList([...onList]);
      }
      if (target.checked === false) {
        onList.splice(14, 1, {
          key: checkList[14].key,
          checked: false,
        });
        onList.splice(16, 1, {
          key: checkList[16].key,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [14][16] 문항 학습지 전체 체크 초기화
    if (Number(target.value) === 14 || Number(target.value) === 16) {
      if (target.checked === false) {
        onList.splice(12, 1, {
          key: target.id,
          checked: false,
        });
        // 편집 false일시 관리도 false
        onList.splice(13, 1, {
          key: checkList[13].key,
          checked: false,
        });
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
        });
        setCheckList([...onList]);
      }
      if (checkList[14].checked && checkList[16].checked) {
        onList.splice(12, 1, {
          key: target.id,
          checked: true,
        });
        setCheckList([...onList]);
      }
      return;
    }
    // [13][15][17] 관리 전체 선택 토글 또는 개별 선택
    if (
      Number(target.value) === 13 ||
      Number(target.value) === 15 ||
      Number(target.value) === 17
    ) {
      if (Number(target.value) === 13 && target.checked === true) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: true,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: true,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 13 && target.checked === false) {
        onList.splice(15, 1, {
          key: checkList[15].key,
          checked: false,
        });
        onList.splice(17, 1, {
          key: checkList[17].key,
          checked: false,
        });
        setCheckList([...onList]);
        return;
      }
      if (Number(target.value) === 15 || Number(target.value) === 17) {
        if (target.checked === false) {
          onList.splice(13, 1, {
            key: checkList[13].key,
            checked: false,
          });
          setCheckList([...onList]);
          return;
        }
        if (checkList[15].checked && checkList[17].checked) {
          onList.splice(13, 1, {
            key: checkList[13].key,
            checked: true,
          });
          setCheckList([...onList]);
          return;
        }
      }
    }
    // console.log(onList);
  };
  useEffect(() => {
    if (isClickedName === true) {
      // isClickedName상태값이 수정이고 데이터가 있을시 해당 데이터로
      loadData();
      // 불러온 체크박스 배열값넣기
      // setCheckList();
    }
    if (isClickedName === false) {
      // isClickedName상태값이 저장일시 디폴트 (defaultPermissions) 로
      setCheckList(defaultPermissions);
    }
  }, [isClickedName]);
  // const openDeleteAlert = (code: string) => {
  //   setCodeValue(code);
  //   setIsUpdateAuthority(false);
  //   setIsCreateNameError(false);
  //   setIsPutAuthority(false);
  //   setIsAlertOpen(true);
  //   setIsDeleteAuthority(true);
  // };
  const submitDelete = (code: string) => {
    // DeleteAuthority({ setIsAlertOpen }, code);
  };
  const loadData = useCallback(() => {
    // getAuthorityList({
    //   setAuthorityList,
    // });
  }, [setAuthorityList]);
  useEffect(() => {
    setDidMount(true);
  }, []);
  // 저장된 권한리스트 데이터 불러오기
  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount]);
  useEffect(() => {
    console.log(checkList);
  }, [checkList, setCheckList, handleChecked]);
  return (
    <Container>
      <IndexInfo list={['운영관리', '권한관리']} />
      <Wrapper>
        {/* <strong>권한 관리</strong> */}
        <InputWrapper>
          <Input
            height="40px"
            padding="5px"
            placeholderSize="14px"
            fontSize="14px"
            borderradius="5px"
            type="text"
            placeholder="권한명을 작성해주세요."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsClickedName(false);
            }}
          />
          <Button
            buttonType="button"
            onClick={openUpdateAlert}
            $padding="10px"
            height={'40px'}
            width={'100px'}
            fontSize="12px"
            $border
          >
            <span>{isClickedName ? '수정' : '저장'}</span>
          </Button>
        </InputWrapper>
        <ListWrap>
          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>권한</th>
                  <th>편집</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={3}>콘텐츠 제작</td>
                  <td>전체</td>
                  <td>
                    <label htmlFor={'isEditCreateChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditCreateChecked'}
                        id={'isEditCreateChecked'}
                        value={0}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[0].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageCreateChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageCreateChecked'}
                        id={'isManageCreateChecked'}
                        value={1}
                        onChange={(e) => handleChecked(e)}
                        disabled={!checkList[0].checked}
                        checked={checkList[1].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>문항</td>
                  <td>
                    <label htmlFor={'isEditCreateListChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditCreateListChecked'}
                        id={'isEditCreateListChecked'}
                        value={2}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[2].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageCreateListChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageCreateListChecked'}
                        id={'isManageCreateListChecked'}
                        value={3}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[3].checked}
                        disabled={!checkList[2].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>학습지</td>
                  <td>
                    <label htmlFor={'isEditWorksheetChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditWorksheetChecked'}
                        id={'isEditWorksheetChecked'}
                        value={4}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[4].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageWorksheetChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageWorksheetChecked'}
                        id={'isManageWorksheetChecked'}
                        value={5}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[5].checked}
                        disabled={!checkList[4].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={3}>콘텐츠 관리</td>
                  <td>전체</td>
                  <td>
                    <label htmlFor={'isEditManagementChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditManagementChecked'}
                        id={'isEditManagementChecked'}
                        value={6}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[6].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageManagementChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageManagementChecked'}
                        id={'isManageManagementChecked'}
                        value={7}
                        onChange={(e) => handleChecked(e)}
                        disabled={!checkList[6].checked}
                        checked={checkList[7].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>문항</td>
                  <td>
                    <label htmlFor={'isEditManagementListChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditManagementListChecked'}
                        id={'isEditManagementListChecked'}
                        value={8}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[8].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageManagementListChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageManagementListChecked'}
                        id={'isManageManagementListChecked'}
                        value={9}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[9].checked}
                        disabled={!checkList[8].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>문항트리</td>
                  <td>
                    <label htmlFor={'isEditTreeChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditTreeChecked'}
                        id={'isEditTreeChecked'}
                        value={10}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[10].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageTreeChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageTreeChecked'}
                        id={'isManageTreeChecked'}
                        value={11}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[11].checked}
                        disabled={!checkList[10].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={3}>운영 관리</td>
                  <td>전체</td>
                  <td>
                    <label htmlFor={'isEditOperationChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditOperationChecked'}
                        id={'isEditOperationChecked'}
                        value={12}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[12].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageOperationChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageOperationChecked'}
                        id={'isManageOperationChecked'}
                        value={13}
                        onChange={(e) => handleChecked(e)}
                        disabled={!checkList[12].checked}
                        checked={checkList[13].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>회원관리</td>
                  <td>
                    <label htmlFor={'isEditMemberChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditMemberChecked'}
                        id={'isEditMemberChecked'}
                        value={14}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[14].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageMemberChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageMemberChecked'}
                        id={'isManageMemberChecked'}
                        value={15}
                        onChange={(e) => handleChecked(e)}
                        disabled={!checkList[14].checked}
                        checked={checkList[15].checked}
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>권한관리</td>
                  <td>
                    <label htmlFor={'isEditAuthorityChecked'}>
                      <input
                        type="checkbox"
                        name={'isEditAuthorityChecked'}
                        id={'isEditAuthorityChecked'}
                        value={16}
                        onChange={(e) => handleChecked(e)}
                        checked={checkList[16].checked}
                      />
                    </label>
                  </td>
                  <td>
                    <label htmlFor={'isManageAuthorityChecked'}>
                      <input
                        type="checkbox"
                        name={'isManageAuthorityChecked'}
                        id={'isManageAuthorityChecked'}
                        value={17}
                        onChange={(e) => handleChecked(e)}
                        disabled={!checkList[16].checked}
                        checked={checkList[17].checked}
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </TableWrapper>
          <AuthorityListWrapper>
            {/* {authorityList?.map((el, i) => (
              <AuthorityWrapper
                key={i}
                onClick={() => {
                  // clickMemberAuthority(el.code);
                  setInputValue(el.name);
                  setIsClickedName(true);
                }}
              >
                <AuthorityName
                  onClick={() => {
                    // clickMemberAuthority(el.code);
                    setInputValue(el.name);
                    setIsClickedName(true);
                  }}
                >
                  {el.name}
                </AuthorityName>
                <DeleteIconWrapper>
                  <BiSolidTrashAlt
                    onClick={() => {
                      // openDeleteAlert(el.code);
                    }}
                  />
                </DeleteIconWrapper>
              </AuthorityWrapper>
            ))} */}
          </AuthorityListWrapper>
        </ListWrap>
      </Wrapper>
      {isDeleteAuthority && (
        <Alert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete(codeValue)}
        />
      )}
      {isUpdateAuthority && (
        <Alert
          title={
            isClickedName
              ? '권한을 수정 하시겠습니까?'
              : '권한을 생성 하시겠습니까?'
          }
          action={isClickedName ? '수정' : '생성'}
          onClick={submitAuthority}
        />
      )}
      {isCreateNameError && <Alert notice title="권한명을 작성해주세요." />}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: 1px solid ${COLOR.SECONDARY};
  padding-top: 10px;
`;
const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 10px;
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > div {
    width: 100%;
    margin-right: 10px;
  }
`;
const TableWrapper = styled.div`
  width: calc(50% - 20px);
  height: 500px;
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    table-layout: fixed;
    tr {
    }
    th {
      border: 1px solid ${COLOR.SECONDARY};
      color: ${COLOR.SECONDARY};
      padding: 15px;
      font-size: 14px;
      font-weight: bold;
    }
    td {
      text-align: center;
      border: 1px solid ${COLOR.SECONDARY};
      padding: 15px;
      text-align: center;
      font-size: 13px;
    }
    .textLeft {
      text-align: left;
    }
  }
`;
const AuthorityListWrapper = styled.div`
  width: calc(50% - 20px);
  height: 500px;
  border: 1px solid ${COLOR.SECONDARY};
  background-color: white;
  display: flex;
  flex-direction: column;
`;